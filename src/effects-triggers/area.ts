import { Vector2D } from "@/types/sprite-sheet";
import { TriggerCondition } from "@/types/trigger";

export class AreaTrigger implements TriggerCondition {
  constructor(
    private area: { x: number; y: number; width: number; height: number },
    private tileSize: number
  ) {}

  isMet(playerPos: Vector2D): boolean {
    return (
      playerPos.x >= this.area.x * this.tileSize &&
      playerPos.x <= (this.area.x + this.area.width) * this.tileSize &&
      playerPos.y >= this.area.y * this.tileSize &&
      playerPos.y <= (this.area.y + this.area.height) * this.tileSize
    );
  }
}
