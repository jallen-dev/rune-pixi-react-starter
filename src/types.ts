import { AnimatedSprite, PixiRef, Sprite } from "@pixi/react"
import { Interpolator, PlayerId } from "rune-games-sdk"

export type ISprite = PixiRef<typeof Sprite>
export type IAnimatedSprite = PixiRef<typeof AnimatedSprite>

export type Vector = {
  x: number
  y: number
}

export type Player = {
  position: Vector
  velocity: Vector
  direction: Vector
  facing: "left" | "right"
  state: "standing" | "walking"
  ready: boolean
}

export type PlayersInterpolators = {
  [playerId: PlayerId]: { position: { x: Interpolator<number> } }
}

export type GameScreen = "lobby" | "play" | "gameOver"

export enum CharacterModel {
  PinkGuy,
  YellowGuy,
}
