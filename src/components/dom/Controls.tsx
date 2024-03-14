import { useEffect } from "react"

export function Controls() {
  useKeyboardControls()

  return (
    <div className="fixed bottom-8 flex w-full gap-2 p-8">
      <button
        className="bg-slate-800 p-4 hover:bg-slate-700 active:bg-slate-900"
        onPointerDown={moveLeft}
        onPointerUp={stop}
        onPointerOut={stop}
      >
        ◄
      </button>
      <button
        className="bg-slate-800 p-4 hover:bg-slate-700 active:bg-slate-900"
        onPointerDown={moveRight}
        onPointerUp={stop}
        onPointerOut={stop}
      >
        ►
      </button>
    </div>
  )
}

function useKeyboardControls() {
  useEffect(() => {
    function keyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        moveLeft()
      } else if (event.key === "ArrowRight") {
        moveRight()
      }
    }

    function keyUp(event: KeyboardEvent) {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        stop()
      }
    }

    window.addEventListener("keydown", keyDown)
    window.addEventListener("keyup", keyUp)

    return () => {
      window.removeEventListener("keydown", keyDown)
      window.removeEventListener("keyup", keyUp)
    }
  }, [])
}

function moveLeft() {
  Rune.actions.moveLeft()
}

function moveRight() {
  Rune.actions.moveRight()
}

function stop() {
  Rune.actions.stop()
}
