import { useEffect } from "react"

import { createInterpolatorsForPlayers, removeInterpolatorsForPlayers, updateInterpolators } from "@/interpolators"
import { useGameStore } from "@/store/useGameStore"

export function useInitClient(assetsLoaded: boolean) {
  useEffect(() => {
    if (!assetsLoaded) {
      return
    }
    Rune.initClient({
      onChange: ({ game, futureGame, players, yourPlayerId, event, allPlayerIds }) => {
        useGameStore.setState({ game, playerDetails: players, yourPlayerId })

        if (event?.name === "stateSync") {
          // remove any old interpolators from previous game
          removeInterpolatorsForPlayers(...Object.keys(useGameStore.getState().interpolators.players))
          createInterpolatorsForPlayers(...allPlayerIds)
        }
        if (event?.name === "playerJoined") {
          createInterpolatorsForPlayers(event.params.playerId)
        }
        if (event?.name === "playerLeft") {
          removeInterpolatorsForPlayers(event.params.playerId)
        }
        if (futureGame) {
          updateInterpolators(game, futureGame)
        }
      },
    })
  }, [assetsLoaded])
}
