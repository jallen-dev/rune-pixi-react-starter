import { Interpolator, Player, PlayerId } from "rune-games-sdk"
import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

import { GameState } from "@/logic"
import { PlayersInterpolators } from "@/types"

type State = {
  yourPlayerId?: PlayerId
  game: GameState
  playerDetails: Record<PlayerId, Player>
  interpolators: {
    timeLeft: Interpolator<number>
    players: PlayersInterpolators
  }
}

export const useGameStore = create<State>()(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  subscribeWithSelector((set, get) => ({
    game: { players: {}, currentScreen: "lobby", timeLeft: 0, gameStartedAt: 0 },
    playerDetails: {},
    interpolators: { timeLeft: Rune.interpolator(), players: {} },
  })),
)
