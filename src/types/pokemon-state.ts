import { Vector2D } from "./sprite-sheet";

export interface GameState {
  player: PlayerState;
}

interface PlayerState {
  position: Vector2D;
}