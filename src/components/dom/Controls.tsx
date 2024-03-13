import { useGameStore } from "@/store/useGameStore"
import { useEffect } from "react"

export function Controls() {
  const playerId = useGameStore((state) => state.yourPlayerId)

  useKeyboardControls(playerId)

  if (!playerId) {
    return null
  }

  return (
    <div className="fixed bottom-8 flex w-full gap-2 p-8">
      <button
        className="bg-slate-800 p-4 hover:bg-slate-700 active:bg-slate-900"
        onPointerDown={() => Rune.actions.moveLeft({ playerId })}
        onPointerUp={() => Rune.actions.stop({ playerId })}
        onPointerOut={() => Rune.actions.stop({ playerId })}
      >
        ◄
      </button>
      <button
        className="bg-slate-800 p-4 hover:bg-slate-700 active:bg-slate-900"
        onPointerDown={() => Rune.actions.moveRight({ playerId })}
        onPointerUp={() => Rune.actions.stop({ playerId })}
        onPointerOut={() => Rune.actions.stop({ playerId })}
      >
        ►
      </button>
    </div>
  )
}

function useKeyboardControls(playerId?: string) {
  useEffect(() => {
    if (!playerId) {
      return
    }

    function keyDown(event: KeyboardEvent) {
      if (!playerId) {
        return
      }

      if (event.key === "ArrowLeft") {
        Rune.actions.moveLeft({ playerId })
      } else if (event.key === "ArrowRight") {
        Rune.actions.moveRight({ playerId })
      }
    }

    function keyUp(event: KeyboardEvent) {
      if (!playerId) {
        return
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        Rune.actions.stop({ playerId })
      }
    }

    window.addEventListener("keydown", keyDown)
    window.addEventListener("keyup", keyUp)

    return () => {
      window.removeEventListener("keydown", keyDown)
      window.removeEventListener("keyup", keyUp)
    }
  }, [playerId])
}
