import { useGameStore } from "@/store/useGameStore"
import { useEffect, useRef } from "react"

export function Clock() {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let rAF = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rAF)

    function loop() {
      if (ref.current) {
        const time = useGameStore.getState().interpolators.timeLeft.getPosition()
        ref.current.textContent = (time / 1000).toFixed(2)
      }
      rAF = requestAnimationFrame(loop)
    }
  }, [])

  return (
    <div>
      Time left: <span ref={ref} />
    </div>
  )
}
