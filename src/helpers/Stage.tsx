import { Stage as PixiStage, useApp } from "@pixi/react"

import { Pixi } from "./Pixi.ts"

export function Stage() {
  return (
    <PixiStage>
      <Content />
    </PixiStage>
  )
}

function Content() {
  const app = useApp()
  app.resizeTo = window

  return <Pixi.Out />
}
