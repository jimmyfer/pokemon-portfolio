import { MapLayer } from '@/types/tiles';
import { SpriteSheet } from './sprite-sheet';
import { TileMap } from './tile-map';
import { LayerPriority } from '@/types/render-types';
import { Effect } from '@/effects/effect';
import { TriggerCondition } from '@/types/trigger';
import { EffectSystem } from '@/core/systems/effect-system';
import { BasicTrigger } from '@/effects/triggers/basic-trigger';
import { EnterIntoBuildingTrigger } from '@/effects/triggers/enter-into-building';
import { MapTransitionEvent } from '@/types/game-event';
import { MapTransitionTrigger } from '@/effects/triggers/map-transition';
import { AreaTriggerCondition } from '@/effects/trigger-conditions/area';
import { BushAreaTriggerCondition } from '@/effects/trigger-conditions/bush-area';
import { JumpTrigger } from '@/effects/triggers/jump';
import { PlayerJumpSequence } from '@/types/effects';
import { NPCRelativePositionTriggerCondition } from '@/effects/trigger-conditions/npc-relative-position';
import { NPCConfig } from '@/types/npc';
import { NPC } from '@/game/npc/npc';

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

    addNPC(config: NPCConfig): this {
        const npc = new NPC(config);

        const abovePositionTrigger = new NPCRelativePositionTriggerCondition(
            npc,
            'above'
        );
        const belowPositionTrigger = new NPCRelativePositionTriggerCondition(
            npc,
            'below'
        );

        const lowEntityLayer = this.layers.find(
            (layer) => layer.priority === LayerPriority.ENTITIES_LOW
        );
        lowEntityLayer!.condition = abovePositionTrigger;

        const highEntityLayer = this.layers.find(
            (layer) => layer.priority === LayerPriority.ENTITIES_HIGH
        );
        highEntityLayer!.condition = belowPositionTrigger;

        lowEntityLayer?.npc.push(npc);
        highEntityLayer?.npc.push(npc);

        return this;
    }

    addMapTransitionTrigger(
        conditions: TriggerCondition[],
        mapEvent: MapTransitionEvent
    ): this {
        this.effectSystem.addTrigger(
            new MapTransitionTrigger(conditions, mapEvent)
        );

        return this;
    }

    addEffectTrigger<SequenceTypes>(
        effect: Effect<SequenceTypes>,
        sequence: SequenceTypes,
        conditions: TriggerCondition[]
    ): this {
        this.effectSystem.addTrigger(
            new BasicTrigger(
                {
                    execute: (deltaTime: number) =>
                        effect.playSequence(deltaTime, sequence),
                    render: () => {
                        effect.render();
                    },
                },
                false,
                conditions
            )
        );
        return this;
    }

    addEnterIntoBuildingTriggerEffect<SequenceTypes>(
        effects: Effect<SequenceTypes>[],
        sequence: SequenceTypes[],
        conditions: TriggerCondition[],
        cooldown: number
    ): this {
        this.effectSystem.addTrigger(
            new EnterIntoBuildingTrigger(
                conditions,
                effects.map(
                    (effect, index) =>
                        new BasicTrigger(
                            {
                                execute: (deltaTime: number) =>
                                    effect.playSequence(
                                        deltaTime,
                                        sequence[index]
                                    ),
                                render: () => {
                                    effect.render();
                                },
                            },
                            true
                        )
                ),
                cooldown
            )
        );
        return this;
    }

    addJumpEffectTrigger(
        sequence: PlayerJumpSequence,
        condition: TriggerCondition
    ): this {
        this.effectSystem.addTrigger(new JumpTrigger(sequence, condition));
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
            npc: [],
            visible: true,
            collidable,
            priority,
        };

        this.layers.push(layer);
        this.currentLayer = layer;

        return this;
    }

    createNpcLayer(width: number, height: number): this {
        const layerNames = this.layers.map((layer) => layer.name);
        if (layerNames.includes('npc_low') || layerNames.includes('npc_high')) {
            throw new Error(
                'NPC layers already exist. Cannot create duplicate NPC layers.'
            );
        }

        const lowEntityLayer: MapLayer = {
            name: 'npc_low',
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
            npc: [],
            visible: true,
            collidable: true,
            priority: LayerPriority.ENTITIES_LOW,
        };

        const highEntityLayer: MapLayer = {
            name: 'npc_high',
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
            npc: [],
            visible: true,
            collidable: true,
            priority: LayerPriority.ENTITIES_HIGH,
        };

        this.layers.push(lowEntityLayer);
        this.layers.push(highEntityLayer);

        return this;
    }

    buildSpriteColumn(
        frames: number[],
        column: number,
        startRow: number
    ): this {
        if (!this.currentLayer) throw new Error('No layer selected');

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
        if (!this.currentLayer) throw new Error('No layer selected');

        frames.forEach((frame, index) => {
            const column = startColumn + index;
            this.currentLayer!.data[row][column].tile = frame;
            this.currentLayer!.data[row][column].offsetX = offsetX;
            this.currentLayer!.data[row][column].offsetY = offsetY;
        });

        return this;
    }

    buildBushSpriteRow(
        frames: number[],
        row: number,
        startColumn: number,
        offsetX: number = 0,
        offsetY: number = 0
    ): this {
        if (!this.currentLayer) throw new Error('No layer selected');

        frames.forEach((frame, index) => {
            const column = startColumn + index;

            const bushCondition = new BushAreaTriggerCondition(
                { x: column, y: row, width: 1, height: 1 },
                32
            );

            this.currentLayer!.data[row][column].tile = frame;
            this.currentLayer!.data[row][column].offsetX = offsetX;
            this.currentLayer!.data[row][column].offsetY = offsetY;
            this.currentLayer!.data[row][column].condition = bushCondition;
        });

        return this;
    }

    buildSingleSprite(
        frame: number,
        row: number,
        column: number,
        flipX: boolean = false,
        flipY: boolean = false,
        offsetX: number = 0,
        offsetY: number = 0,
        condition?: TriggerCondition
    ): this {
        if (!this.currentLayer) throw new Error('No layer selected');
        this.currentLayer.data[row][column].tile = frame;
        this.currentLayer.data[row][column].flipX = flipX;
        this.currentLayer.data[row][column].flipY = flipY;
        this.currentLayer.data[row][column].offsetX = offsetX;
        this.currentLayer.data[row][column].offsetY = offsetY;
        this.currentLayer.data[row][column].condition = condition;
        return this;
    }

    buildSingleTileCondition(
        row: number,
        column: number,
        condition: TriggerCondition
    ): this {
        if (!this.currentLayer) throw new Error('No layer selected');

        this.currentLayer.data[row][column].condition = condition;
        return this;
    }

    buildSingleBushSprite(
        frame: number,
        row: number,
        column: number,
        flipX: boolean = false,
        flipY: boolean = false,
        offsetX: number = 0,
        offsetY: number = 0
    ): this {
        if (!this.currentLayer) throw new Error('No layer selected');

        const bushCondition = new AreaTriggerCondition(
            { x: column, y: row, width: 1, height: 1 },
            32
        );

        this.currentLayer.data[row][column].tile = frame;
        this.currentLayer.data[row][column].flipX = flipX;
        this.currentLayer.data[row][column].flipY = flipY;
        this.currentLayer.data[row][column].offsetX = offsetX;
        this.currentLayer.data[row][column].offsetY = offsetY;
        this.currentLayer.data[row][column].condition = bushCondition;
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
        if (!this.currentLayer) throw new Error('No layer selected');

        for (let i = 0; i < frames.length; i++) {
            const rowObject = frames[i];
            const numColumns = rowObject.length;

            for (let j = 0; j < numColumns; j++) {
                const frame = rowObject[j];
                const targetColumn = flipX
                    ? column + (numColumns - 1 - j)
                    : column + j;
                this.currentLayer.data[row + i][targetColumn].tile = frame;
                this.currentLayer.data[row + i][targetColumn].flipX = flipX;
                this.currentLayer.data[row + i][targetColumn].offsetX = offsetX;
                this.currentLayer.data[row + i][targetColumn].offsetY = offsetY;
            }
        }

        return this;
    }

    cleanSprite(row: number, column: number): this {
        if (!this.currentLayer) throw new Error('No layer selected');
        this.currentLayer.data[row][column].tile = 0;
        this.currentLayer.data[row][column].flipX = false;
        this.currentLayer.data[row][column].offsetX = 0;
        this.currentLayer.data[row][column].offsetY = 0;
        return this;
    }

    buildSpriteObjectRow(
        tilesId: number[][],
        row: number,
        startColumn: number,
        offsetX: number = 0,
        offsetY: number = 0,
        cantidad: number = 1,
        flipX: boolean = false,
        condition?: TriggerCondition
    ): this {
        if (!this.currentLayer) throw new Error('No layer selected');

        const objectHeight = tilesId.length;
        const objectWidth = tilesId[0].length;

        for (let copy = 0; copy < cantidad; copy++) {
            for (let r = 0; r < objectHeight; r++) {
                const targetRow = row + r;

                if (targetRow >= this.currentLayer.data.length) continue;

                for (let c = 0; c < objectWidth; c++) {
                    const targetColumn = startColumn + c + copy * objectWidth;

                    if (
                        targetColumn >= this.currentLayer.data[targetRow].length
                    )
                        continue;

                    this.currentLayer.data[targetRow][targetColumn].tile =
                        tilesId[r][c];

                    this.currentLayer.data[targetRow][targetColumn].offsetX =
                        offsetX == 0
                            ? offsetX
                            : offsetX - copy * objectWidth * 12;
                    this.currentLayer.data[targetRow][targetColumn].offsetY =
                        offsetY;

                    this.currentLayer.data[targetRow][targetColumn].flipX =
                        flipX;

                    this.currentLayer.data[targetRow][targetColumn].condition =
                        condition;
                }
            }
        }

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

    buildCollisionRow(
        row: number,
        startColumn: number,
        quantity: number
    ): this {
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
        if (!this.currentLayer) throw new Error('No layer selected');

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

    fillAreaWithTiles(tiles: number[][]): this {
        if (!this.currentLayer) throw new Error('No layer selected');

        const layerRows = this.currentLayer.data.length;
        const layerCols = this.currentLayer.data[0].length;
        const patternRows = tiles.length;

        for (let row = 0; row < layerRows; row++) {
            const tileRow = tiles[row % patternRows];
            const patternCols = tileRow.length;
            for (let col = 0; col < layerCols; col++) {
                this.currentLayer.data[row][col].tile =
                    tileRow[col % patternCols];
            }
        }

        return this;
    }

    build(): TileMap {
        if (!this.tileset) throw new Error('Tileset not configured');

        return new TileMap(
            this.layers,
            this.tileset,
            this.tileSize,
            this.scale,
            this.effectSystem
        );
    }
}
