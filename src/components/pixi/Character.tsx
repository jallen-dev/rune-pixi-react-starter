import { Texture } from "@pixi/core"
import { AnimatedSprite, useTick } from "@pixi/react"
import { useId, useMemo, useRef } from "react"
import { PlayerId } from "rune-games-sdk"

import { Html } from "@/helpers/Html"
import { useGameStore } from "@/store/useGameStore"
import { CharacterModel, IAnimatedSprite } from "@/types"

export function Character({ playerId, model }: { playerId: PlayerId; model: CharacterModel }) {
  const facing = useGameStore((state) => state.game.players[playerId].facing)
  const playerState = useGameStore((state) => state.game.players[playerId].state)
  const spriteRef = useRef<IAnimatedSprite>(null)
  const htmlRef = useRef<HTMLDivElement>(null)
  const lastPosition = useRef([Infinity, 0])
  const id = useId()

  const textures = useMemo(() => [Texture.from(`character_${model}_a`), Texture.from(`character_${model}_b`)], [model])

  useTick(() => {
    if (!spriteRef.current || !htmlRef.current) {
      return
    }

    const position = getInterpolatedPositionForPlayer(playerId)
    if (position[0] !== lastPosition.current[0]) {
      spriteRef.current.position.set(...position)
      const globalPosition = spriteRef.current.toGlobal({ x: 0, y: 0 })
      htmlRef.current.style.transform = `translate(${globalPosition.x - 20}px, ${globalPosition.y - 60}px)`
      lastPosition.current = position
    }
  })

  return (
    <>
      <AnimatedSprite
        ref={spriteRef}
        anchor={{ x: 0.5, y: 0.0 }}
        isPlaying={playerState === "walking"}
        scale={facing === "left" ? { x: 1, y: 1 } : { x: -1, y: 1 }}
        currentFrame={0}
        textures={textures}
        animationSpeed={0.15}
      />
      {/* Example html content in a Pixi component: */}
      <Html.In>
        {/* I set a key because React seems to lose track of which div is which when sent through the portal.
        That is, modifying the div below sometimes modified another Character's div. Even though we are referring
        to it directly with useRef. Weird. */}
        <div ref={htmlRef} key={id} className="fixed">
          {/* We can put anything in here. Here's a color picker because why not? */}
          <input type="color" defaultValue="#00ff00" />
        </div>
      </Html.In>
    </>
  )
}

function getInterpolatedPositionForPlayer(playerId: PlayerId) {
  const interpolator = useGameStore.getState().interpolators.players[playerId].position.x
  return [interpolator.getPosition(), 0]
}
