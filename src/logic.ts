import type { PlayerId, RuneClient } from "rune-games-sdk/multiplayer"

import { ACCELERATION, DISTANCE_PER_SECOND, MOVEMENT_THRESHOLD, ROUND_DURATION } from "./constants"
import { GameScreen, Player } from "./types"

export type GameState = {
  players: Record<PlayerId, Player>
  currentScreen: GameScreen
  timeLeft: number
  gameStartedAt: number
}

type GameActions = {
  ready: () => void
  moveLeft: () => void
  moveRight: () => void
  stop: () => void
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 4,
  setup: (allPlayerIds): GameState => {
    return {
      players: allPlayerIds.reduce(
        (acc, id, i) => ({
          ...acc,
          [id]: {
            position: { x: 20 + i * 50, y: 0 },
            direction: { x: 0, y: 0 },
            velocity: { x: 0, y: 0 },
            facing: "left",
            state: "standing",
            ready: false,
          },
        }),
        {} as Record<PlayerId, Player>,
      ),
      currentScreen: "lobby",
      timeLeft: ROUND_DURATION,
      gameStartedAt: Infinity,
    }
  },
  actions: {
    ready: (_, { game, playerId }) => {
      game.players[playerId].ready = true

      if (Object.values(game.players).every((player) => player.ready)) {
        startGame(game)
      }
    },
    moveLeft: (_, { game, playerId }) => {
      game.players[playerId].facing = "left"
      game.players[playerId].state = "walking"
      game.players[playerId].direction.x = -1
    },
    moveRight: (_, { game, playerId }) => {
      game.players[playerId].facing = "right"
      game.players[playerId].state = "walking"
      game.players[playerId].direction.x = 1
    },
    stop: (_, { game, playerId }) => {
      game.players[playerId].state = "standing"
      game.players[playerId].direction.x = 0
    },
  },
  events: {
    playerJoined: (playerId, { game }) => {
      game.players[playerId] = {
        position: { x: 0, y: 0 },
        direction: { x: 0, y: 0 },
        velocity: { x: 0, y: 0 },
        facing: "left",
        state: "standing",
        ready: false,
      }
    },
    playerLeft: (playerId, { game }) => {
      delete game.players[playerId]

      // if we're in the lobby they were the last one to not be ready, start the game
      if (game.currentScreen === "lobby" && Object.values(game.players).every((player) => player.ready)) {
        startGame(game)
      }
    },
  },
  update: ({ game }) => {
    if (game.currentScreen === "play") {
      game.timeLeft = ROUND_DURATION - (Rune.gameTime() - game.gameStartedAt)
      if (game.timeLeft <= 0) {
        game.currentScreen = "gameOver"
        Rune.gameOver({
          players: Object.keys(game.players).reduce(
            (acc, playerId) => {
              acc[playerId] = "WON"
              return acc
            },
            {} as Record<PlayerId, "WON" | "LOST">,
          ),
          delayPopUp: true,
        })
      }

      // player movement
      for (const playerId in game.players) {
        const player = game.players[playerId]
        const currentVelocity = {
          x: ACCELERATION * player.direction.x + (1 - ACCELERATION) * player.velocity.x,
          y: ACCELERATION * player.direction.y + (1 - ACCELERATION) * player.velocity.y,
        }
        if (Math.abs(currentVelocity.x) < MOVEMENT_THRESHOLD) {
          currentVelocity.x = 0
        }
        player.velocity = currentVelocity
        player.position.x += player.velocity.x * (DISTANCE_PER_SECOND / 10)
        player.position.y += player.velocity.y * (DISTANCE_PER_SECOND / 10)
      }
    }
  },
  updatesPerSecond: 10,
})

function startGame(game: GameState) {
  game.currentScreen = "play"
  game.gameStartedAt = Rune.gameTime()
}
