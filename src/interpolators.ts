import { PlayerId } from "rune-games-sdk"

import { GameState } from "./logic"
import { useGameStore } from "./store/useGameStore"

export function updateInterpolators(game: GameState, futureGame: GameState) {
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

export function createInterpolatorsForPlayers(...playerIds: PlayerId[]) {
  const interpolators = useGameStore.getState().interpolators
  for (const playerId of playerIds) {
    interpolators.players[playerId] = { position: { x: Rune.interpolator() } }
  }
  useGameStore.setState({ interpolators })
}

export function removeInterpolatorsForPlayers(...playerIds: PlayerId[]) {
  const interpolators = useGameStore.getState().interpolators
  for (const playerId of playerIds) {
    delete interpolators.players[playerId]
  }
  useGameStore.setState({ interpolators })
}
