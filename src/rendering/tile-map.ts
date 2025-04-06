import { MapLayer } from "@/types/tiles";
import { Camera } from "./camera";
import { SpriteSheet } from "./sprite-sheet";
import { LayerPriority } from "@/types/render-types";
import { EffectSystem } from "@/core/systems/effect-system";
import { Vector2D } from "@/types/sprite-sheet";

export class TileMap {
  private layers: MapLayer[];
  private tileset: SpriteSheet;
  private tileSize: number;
  private scale: number;
  private effectSystem: EffectSystem;

  constructor(
    layers: MapLayer[],
    tileset: SpriteSheet,
    tileSize: number,
    scale: number,
    effectSystem: EffectSystem
  ) {
    this.layers = layers;
    this.tileset = tileset;
    this.tileSize = tileSize;
    this.scale = scale;
    this.effectSystem = effectSystem;
  }

  get scaledTileSize(): number {
    return this.tileSize * this.scale;
  }

  public getMapWidth(): number {
    const maxWidth = Math.max(this.layers[1].data[0].length || 0);
    return maxWidth * this.scaledTileSize;
  }

  public getMapHeight(): number {
    const maxHeight = Math.max(this.layers[1].data.length || 0);
    return maxHeight * this.scaledTileSize;
  }

  update(deltaTime: number, playerPos: Vector2D) {
    this.effectSystem.update(playerPos, deltaTime);
  }

  render(
    ctx: CanvasRenderingContext2D,
    camera: Camera,
    priority: LayerPriority
  ): void {
    const tilesPerRow = Math.floor(
      this.tileset.getImage().width / this.tileset.width
    );

    this.layers.forEach((layer) => {
      if (!layer.visible || layer.priority !== priority) return;

      for (let y = 0; y < layer.data.length; y++) {
        for (let x = 0; x < layer.data[y].length; x++) {
          const tile = layer.data[y][x];
          const tileId = tile.tile;
          if (tileId === -1) continue;

          const sourceX = (tileId % tilesPerRow) * this.tileset.width;
          const sourceY =
            Math.floor(tileId / tilesPerRow) * this.tileset.height;

          const screenX = Math.ceil(
            x * this.scaledTileSize - camera.position.x
          );
          const screenY = Math.ceil(
            y * this.scaledTileSize - camera.position.y
          );

          const offsetX = tile.offsetX;
          const offsetY = tile.offsetY;

          if (tile.flipX) {
            ctx.save();
            ctx.translate(
              screenX + offsetX + this.scaledTileSize,
              screenY + offsetY
            );
            ctx.scale(-1, 1);
            ctx.drawImage(
              this.tileset.getImage(),
              sourceX,
              sourceY,
              this.tileset.width,
              this.tileset.height,
              0,
              0,
              this.scaledTileSize,
              this.scaledTileSize
            );
            ctx.restore();
          } else {
            ctx.drawImage(
              this.tileset.getImage(),
              sourceX,
              sourceY,
              this.tileset.width,
              this.tileset.height,
              screenX + offsetX,
              screenY + offsetY,
              this.scaledTileSize,
              this.scaledTileSize
            );
          }
        }
      }
    });

    this.effectSystem.triggers.forEach((trigger) => {
      trigger.action.render();
    });
  }

  public getCollisionGrid(): boolean[][] {
    const collidableLayer = this.layers.find((layer) => layer.collidable);
    if (!collidableLayer) {
      return [];
    }
    const grid: boolean[][] = [];
    const width = collidableLayer?.data[0]?.length || 0;
    const height = collidableLayer?.data.length || 0;

    for (let y = 0; y < height; y++) {
      grid[y] = new Array(width).fill(false);
    }

    this.layers.forEach((layer) => {
      if (layer.collidable) {
        layer.data.forEach((row, y) => {
          row.forEach((tile, x) => {
            if (tile.tile !== -1 || tile.collidable) grid[y][x] = true;
          });
        });
      }
    });

    return grid;
  }

  public getTileSize(): number {
    return this.tileSize * this.scale;
  }
}
