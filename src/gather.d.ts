import { Game } from "@gathertown/gather-game-client"

declare var gameSpace: {
  id: number
  mapId: string
  gameState: Array<{
    x: number
    y: number
  }>
}

declare var game: Game
