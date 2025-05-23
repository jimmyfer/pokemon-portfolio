import { MapLayer } from '@/types/tiles';
import { Camera } from './camera';
import { SpriteSheet } from './sprite-sheet';
import { EffectSystem } from '@/core/systems/effect-system';
import { GameContext } from '@/core/engine/game-context';
import { LayerPriority } from '@/types/render-types';
import { GAME_CANVAS } from '@/core/engine/canvas-token';

export class TileMap {
    private layers: MapLayer[];
    private tileset: SpriteSheet;
    private tileSize: number;
    private scale: number;
    private effectSystem: EffectSystem;
    private camera: Camera;
    private ctx: CanvasRenderingContext2D;

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
        const gameContext = GameContext.getInstance();
        this.camera = gameContext.getBean(Camera);
        this.ctx = gameContext.getBean(GAME_CANVAS);
    }

    get scaledTileSize(): number {
        return this.tileSize * this.scale;
    }

    public getMapWidth(): number {
        const maxWidth = Math.max(this.layers[0].data[0].length || 0);
        return maxWidth * this.scaledTileSize;
    }

    public getMapHeight(): number {
        const maxHeight = Math.max(this.layers[0].data.length || 0);
        return maxHeight * this.scaledTileSize;
    }

    update(deltaTime: number, priority?: LayerPriority) {
        if (priority === LayerPriority.WORLD_EFFECTS) {
            this.effectSystem.update(deltaTime);
        }
        if (
            priority === LayerPriority.ENTITIES_HIGH ||
            priority === LayerPriority.ENTITIES_LOW
        ) {
            this.layers.forEach((layer) =>
                layer.npc.forEach((npc) => npc.update(deltaTime))
            );
        }
    }

    render(priority: LayerPriority): void {
        const tilesPerRow = Math.floor(
            this.tileset.getImage().width / this.tileset.width
        );

        this.layers
            .filter((layer) => layer.priority === priority)
            .forEach((layer) => {
                if (layer.condition && !layer.condition?.isMet()) return;

                for (let y = 0; y < layer.data.length; y++) {
                    for (let x = 0; x < layer.data[y].length; x++) {
                        const tile = layer.data[y][x];
                        const tileId = tile.tile;
                        if (tileId === -1) continue;

                        if (tile.condition) {
                            if (!tile.condition.isMet()) {
                                continue;
                            }
                        }

                        const sourceX =
                            (tileId % tilesPerRow) * this.tileset.width;
                        const sourceY =
                            Math.floor(tileId / tilesPerRow) *
                            this.tileset.height;

                        const screenX = Math.ceil(
                            x * this.scaledTileSize - this.camera.position.x
                        );
                        const screenY = Math.ceil(
                            y * this.scaledTileSize - this.camera.position.y
                        );

                        const offsetX = tile.offsetX;
                        const offsetY = tile.offsetY;

                        if (tile.flipX || tile.flipY) {
                            this.ctx.save();
                            this.ctx.translate(
                                screenX +
                                    offsetX +
                                    (tile.flipX ? this.scaledTileSize : 0),
                                screenY +
                                    offsetY +
                                    (tile.flipY ? this.scaledTileSize : 0)
                            );
                            this.ctx.scale(
                                tile.flipX ? -1 : 1,
                                tile.flipY ? -1 : 1
                            );
                            this.ctx.drawImage(
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
                            this.ctx.restore();
                        } else {
                            this.ctx.drawImage(
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
                layer.npc.forEach((npc) => npc.render());
            });

        if (priority === LayerPriority.WORLD_EFFECTS) {
            this.effectSystem.render();
        }
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
                        if (tile.tile !== -1 || tile.collidable) {
                            grid[y][x] = true;
                        }
                    });
                });
            }
        });

        this.layers.forEach((layer) =>
            layer.npc.forEach((npc) => {
                const npcTileX = Math.floor(
                    npc.position.x / this.scaledTileSize
                );
                const npcTileY = Math.floor(
                    npc.position.y / this.scaledTileSize
                );

                if (
                    npcTileY >= 0 &&
                    npcTileY < height &&
                    npcTileX >= 0 &&
                    npcTileX < width
                ) {
                    grid[npcTileY][npcTileX] = true;
                }
            })
        );

        return grid;
    }

    public getTileSize(): number {
        return this.tileSize * this.scale;
    }
}
