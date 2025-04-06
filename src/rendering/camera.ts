import { Injectable } from "@/core/decorators/injectable";
import { GameContext } from "@/core/engine/game-context";
import { Player } from "@/game/player/player";
import { Vector2D } from "@/types/sprite-sheet";

@Injectable()
export class Camera {
  position: Vector2D = { x: 0, y: 0 };
  viewport: { width: number; height: number };
  private target?: Player;

  private bounds = { minX: 0, minY: 0, maxX: Infinity, maxY: Infinity };

  constructor() {
    this.viewport = {
      width: window.innerWidth * 0.7,
      height: window.innerHeight * 0.8,
    };
  }

  setBounds(mapWidth: number, mapHeight: number): void {
    this.bounds = {
      minX: 0,
      minY: 0,
      maxX: Math.max(mapWidth - this.viewport.width, 0),
      maxY: Math.max(mapHeight - this.viewport.height, 0),
    };
  }

  follow(target: Player): void {
    this.target = target;
  }

  update(deltaTime: number): void {
    if (!this.target) return;

    const ctx = GameContext.getInstance().getBean(CanvasRenderingContext2D);
    const targetX = this.target.position.x - ctx.canvas.width / 2;
    const targetY = this.target.position.y - ctx.canvas.height / 2;

    const offsetX = (ctx.canvas.width - this.viewport.width) / 2;
    const offsetY = (ctx.canvas.height - this.viewport.height) / 2;

    const clampedX = this.clamp(targetX, this.bounds.minX - offsetX, this.bounds.maxX - offsetX);
    const clampedY = this.clamp(targetY, this.bounds.minY - offsetY, this.bounds.maxY - offsetY);

    const damping = 0.1 * (deltaTime / 16.67);

    this.position.x += (clampedX - this.position.x) * damping;
    this.position.y += (clampedY - this.position.y) * damping;
  }

  clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(value, max));
  }
}
