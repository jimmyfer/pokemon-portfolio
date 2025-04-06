import { MapLayer } from "@/types/tiles";
import { SpriteSheet } from "./sprite-sheet";
import { TileMap } from "./tile-map";
import { LayerPriority } from "@/types/render-types";
import { Effect } from "@/game/effects/effect";
import { DoorSecuence } from "@/game/effects/door-open";
import { EffectSystem, EffectTrigger } from "@/core/systems/effect-system";
import { TriggerCondition } from "@/types/trigger";

export class TileMapBuilder {
  private layers: MapLayer[] = [];
  private currentLayer: MapLayer | null = null;
  private tileset!: SpriteSheet;
  private tileSize: number;
  private scale: number;
  private effectSystem = new EffectSystem();

  constructor(tileSize: number = 16, scale: number = 2) {
    this.tileSize = tileSize;
    this.scale = scale;
  }

  addEffectTrigger(
    effect: Effect<DoorSecuence>,
    conditions: TriggerCondition[],
    cooldown = 0
  ): this {
    this.effectSystem.addTrigger(
      new EffectTrigger(
        conditions,
        {
          execute: (deltaTime: number) =>
            effect.playSequence(DoorSecuence.OPEN_EFFECT, deltaTime),
          render: () => {
            effect.render();
          }
        },
        cooldown
      )
    );
    return this;
  }

  setTileset(tileSet: SpriteSheet): this {
    this.tileset = tileSet;
    return this;
  }

  createLayer(
    name: string,
    width: number,
    height: number,
    collidable: boolean = false,
    priority: LayerPriority
  ): this {
    const layer: MapLayer = {
      name,
      data: Array.from({ length: height }, () =>
        Array.from({ length: width }, () => ({
          tile: -1,
          offsetX: 0,
          offsetY: 0,
          flipX: false,
          flipY: false,
          collidable: false,
        }))
      ),
      visible: true,
      collidable,
      priority,
    };

    this.layers.push(layer);
    this.currentLayer = layer;

    return this;
  }

  buildSpriteColumn(frames: number[], column: number, startRow: number): this {
    if (!this.currentLayer) throw new Error("No layer selected");

    frames.forEach((frame, index) => {
      const row = startRow + index;
      this.currentLayer!.data[row][column].tile = frame;
    });

    return this;
  }

  buildSpriteRow(
    frames: number[],
    row: number,
    startColumn: number,
    offsetX: number = 0,
    offsetY: number = 0
  ): this {
    if (!this.currentLayer) throw new Error("No layer selected");

    frames.forEach((frame, index) => {
      const column = startColumn + index;
      this.currentLayer!.data[row][column].tile = frame;
      this.currentLayer!.data[row][column].offsetX = offsetX;
      this.currentLayer!.data[row][column].offsetY = offsetY;
    });

    return this;
  }

  buildSingleSprite(
    frame: number,
    row: number,
    column: number,
    flipX: boolean = false,
    offsetX: number = 0,
    offsetY: number = 0
  ): this {
    if (!this.currentLayer) throw new Error("No layer selected");
    this.currentLayer.data[row][column].tile = frame;
    this.currentLayer.data[row][column].flipX = flipX;
    this.currentLayer.data[row][column].offsetX = offsetX;
    this.currentLayer.data[row][column].offsetY = offsetY;
    return this;
  }

  buildSpriteObject(
    frames: number[][],
    row: number,
    column: number,
    flipX: boolean = false,
    offsetX: number = 0,
    offsetY: number = 0
  ): this {
    if (!this.currentLayer) throw new Error("No layer selected");

    for (let i = 0; i < frames.length; i++) {
      const rowObject = frames[i];
      const numColumns = rowObject.length;

      for (let j = 0; j < numColumns; j++) {
        const frame = rowObject[j];
        const targetColumn = flipX ? column + (numColumns - 1 - j) : column + j;
        this.currentLayer.data[row + i][targetColumn].tile = frame;
        this.currentLayer.data[row + i][targetColumn].flipX = flipX;
        this.currentLayer.data[row + i][targetColumn].offsetX = offsetX;
        this.currentLayer.data[row + i][targetColumn].offsetY = offsetY;
      }
    }

    return this;
  }

  buildSpriteObjectRow(
    frames: number[],
    row: number,
    startColumn: number,
    offsetX: number = 0,
    offsetY: number = 0,
    cantidad: number
  ): this {
    if (!this.currentLayer) throw new Error("No layer selected");

    frames.forEach((frame, index) => {
      const column = startColumn + index;
      for (let i = 0; i < cantidad; i++) {
        this.currentLayer!.data[row][column + i * frames.length].tile = frame;
        this.currentLayer!.data[row][column + i * frames.length].offsetX =
          offsetX - i * frames.length * 12;
        this.currentLayer!.data[row][column + i * frames.length].offsetY =
          offsetY;
      }
    });

    return this;
  }

  buildCollisionRec(
    row: number,
    column: number,
    rowQuantity: number,
    columnQuantity: number
  ): this {
    for (let i = 0; i < rowQuantity; i++) {
      for (let j = 0; j < columnQuantity; j++) {
        this.currentLayer!.data[row + i][column + j].collidable = true;
      }
    }
    return this;
  }

  buildSingleCollision(row: number, column: number): this {
    this.currentLayer!.data[row][column].collidable = true;
    return this;
  }

  buildCollisionRow(row: number, startColumn: number, quantity: number): this {
    const column = startColumn;
    for (let i = 0; i < quantity; i++) {
      if (this.currentLayer!.data[row][column + i])
        this.currentLayer!.data[row][column + i].collidable = true;
    }
    return this;
  }

  buildCollisionColum(
    column: number,
    startRow: number,
    quantity: number
  ): this {
    const row = startRow;
    for (let i = 0; i < quantity; i++) {
      if (this.currentLayer!.data[row + i][column])
        this.currentLayer!.data[row + i][column].collidable = true;
    }
    return this;
  }

  fillArea(
    tileId: number,
    x: number,
    y: number,
    width: number,
    height: number
  ): this {
    if (!this.currentLayer) throw new Error("No layer selected");

    for (let row = y; row < y + height; row++) {
      for (let col = x; col < x + width; col++) {
        if (
          row < this.currentLayer.data.length &&
          col < this.currentLayer.data[0].length
        ) {
          this.currentLayer.data[row][col].tile = tileId;
        }
      }
    }
    return this;
  }

  build(): TileMap {
    if (!this.tileset) throw new Error("Tileset not configured");

    return new TileMap(
      this.layers,
      this.tileset,
      this.tileSize,
      this.scale,
      this.effectSystem
    );
  }
}
