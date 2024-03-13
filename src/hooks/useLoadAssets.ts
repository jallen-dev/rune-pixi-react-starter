import { Assets } from "@pixi/assets"
import { SCALE_MODES } from "@pixi/constants"
import { useEffect, useState } from "react"

export const useLoadAssets = () => {
  const [assetsLoaded, setAssetsLoaded] = useState(false)

  useEffect(() => {
    load().then(() => setAssetsLoaded(true))
  }, [])

  return assetsLoaded
}

function load() {
  Assets.add([
    {
      alias: "character_0_a",
      src: "./tile_0004.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "character_0_b",
      src: "./tile_0005.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "character_1_a",
      src: "./tile_0006.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "character_1_b",
      src: "./tile_0007.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
  ])

  return Assets.load(["character_0_a", "character_0_b", "character_1_a", "character_1_b"])
}
