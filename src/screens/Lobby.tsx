import { useGameStore } from "@/store/useGameStore"
import { PlayerId } from "rune-games-sdk"
import { useShallow } from "zustand/react/shallow"

export function Lobby() {
  const playerIds = useGameStore(useShallow((state) => Object.keys(state.game.players)))
  const yourPlayerId = useGameStore((state) => state.yourPlayerId) ?? ""
  const ready = useGameStore((state) => state.game.players[yourPlayerId]?.ready)

  return (
    <div>
      <div className="flex w-screen flex-wrap justify-around gap-2 p-4">
        {playerIds.map((playerId) => (
          <Player key={playerId} playerId={playerId} />
        ))}
      </div>
      <div>
        {yourPlayerId && !ready && (
          <button
            className="fixed bottom-16 left-1/2 -translate-x-1/2 rounded-lg bg-green-600 p-4"
            onClick={() => {
              Rune.actions.ready({ playerId: yourPlayerId })
            }}
          >
            Ready!
          </button>
        )}
      </div>
    </div>
  )
}

function Player({ playerId }: { playerId: PlayerId }) {
  const details = useGameStore((state) => state.playerDetails[playerId])
  const ready = useGameStore((state) => state.game.players[playerId].ready)

  return (
    <div className="w-1/3 overflow-hidden">
      <div className="flex flex-col items-center gap-2">
        <img src={details.avatarUrl} alt={details.displayName} />
        <h2 className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-center">
          {details.displayName}
        </h2>
        {ready ? <span className="text-green-600">Ready</span> : <span className="text-red-600">Not Ready</span>}
      </div>
    </div>
  )
}
