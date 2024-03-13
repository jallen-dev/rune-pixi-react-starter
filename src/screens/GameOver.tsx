import { useEffect } from "react"

// Note: You don't need to build a game over screen or manually call Rune.showGameOverPopUp().
// You could just call Rune.gameOver() with `delayPopUp: false` in logic.ts.
// But this can be useful if you want to show something before the player sees the game over pop up.
export function GameOver() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      Rune.showGameOverPopUp()
    }, 1000)
    return () => clearTimeout(timeout)
  }, [])

  return <div>Game Over</div>
}
