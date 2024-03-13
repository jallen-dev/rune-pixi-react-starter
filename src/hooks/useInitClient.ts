import { useEffect } from "react"

import { createInterpolatorsForPlayers, removeInterpolatorsForPlayers, updateInterpolators } from "@/interpolators"
import { useGameStore } from "@/store/useGameStore"

export function useInitClient() {
  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, futureGame, players, yourPlayerId, event }) => {
        useGameStore.setState({ game, playerDetails: players, yourPlayerId })

        if (event?.name === "stateSync") {
          createInterpolatorsForPlayers(...Object.keys(players))
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
  }, [])
}
