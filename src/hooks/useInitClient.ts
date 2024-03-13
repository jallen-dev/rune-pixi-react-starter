import { GameState } from "@/logic"
import { useGameStore } from "@/store/useGameStore"
import { PlayersInterpolators } from "@/types"
import { useEffect } from "react"
import { Players } from "rune-games-sdk"

export function useInitClient() {
  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, futureGame, players, yourPlayerId, event }) => {
        useGameStore.setState({ game, playerDetails: players, yourPlayerId })

        if (event?.name === "stateSync") {
          createInterpolatorsForPlayers(players)
        }
        if (event?.name === "playerJoined") {
          createInterpolatorForPlayer(event.params.playerId)
        }
        if (futureGame) {
          updateInterpolators(game, futureGame)
        }
      },
    })
  }, [])
}

function updateInterpolators(game: GameState, futureGame: GameState) {
  const interpolators = useGameStore.getState().interpolators

  interpolators.timeLeft.update({
    game: game.timeLeft,
    futureGame: futureGame.timeLeft,
  })

  Object.keys(interpolators.players).forEach((playerId) => {
    interpolators.players[playerId].position.x.update({
      game: game.players[playerId].position.x,
      futureGame: futureGame.players[playerId].position.x,
    })
  })
}

function createInterpolatorsForPlayers(players: Players) {
  const interpolators = useGameStore.getState().interpolators
  const playerInterpolators = Object.keys(players).reduce((acc, playerId) => {
    acc[playerId] = { position: { x: Rune.interpolator() } }
    return acc
  }, {} as PlayersInterpolators)
  interpolators.players = playerInterpolators
  useGameStore.setState({ interpolators })
}

function createInterpolatorForPlayer(playerId: string) {
  const interpolators = useGameStore.getState().interpolators
  interpolators.players[playerId] = { position: { x: Rune.interpolator() } }
  useGameStore.setState({ interpolators })
}
