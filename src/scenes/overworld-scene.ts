import { GameContext } from '@/core/engine/game-context';
import { CollisionSystem } from '@/core/systems/collision-system';
import { LayerPriority } from '@/types/render-types';
import { createLittleRootTown } from '@/game/map/littleroot_town/littleroot-town';
import { Player } from '@/game/player/player';
import { Camera } from '@/rendering/camera';
import { LayerManager } from '@/rendering/layer-manager';
import { TileMap } from '@/rendering/tile-map';
import { GameScene } from '@/scenes/game-scene';
import { Input } from '@/input/input-manager';

export class OverworldScene extends GameScene {
    private camera: Camera;
    private player: Player;
    private tileMap!: TileMap;
    private npcs: any[] = [];
    private lastExecutionTime = Date.now();

    private layerManager: LayerManager;

    private collisionSystem: CollisionSystem;

    constructor() {
        super();

        const gameContext = GameContext.getInstance();
        this.layerManager = gameContext.getBean(LayerManager);
        this.collisionSystem = gameContext.getBean(CollisionSystem);
        this.camera = gameContext.getBean(Camera);

        this.player = new Player();
        this.initializeLayers();
    }

    async onEnter(): Promise<void> {
        await this.loadMap();
        this.initializeLayers();
        this.camera.follow(this.player);
    }

    private async loadMap(): Promise<void> {
        this.tileMap = await createLittleRootTown();
        this.collisionSystem.setTileMap(this.tileMap);

        this.camera.setBounds(
            this.tileMap.getMapWidth(),
            this.tileMap.getMapHeight()
        );
    }

    private initializeLayers(): void {
        Input.initialize();

        this.layerManager.addLayer('background', {
            priority: LayerPriority.BACKGROUND,
            enabled: true,
            update: (delta) => {},
            render: (ctx) => {
                this.tileMap.render(ctx, this.camera, LayerPriority.BACKGROUND);
            },
        });

        this.layerManager.addLayer('background_low', {
            priority: LayerPriority.BACKGROUND_LOW,
            enabled: true,
            update: (delta) => {},
            render: (ctx) => {
                this.tileMap.render(
                    ctx,
                    this.camera,
                    LayerPriority.BACKGROUND_LOW
                );
            },
        });

        this.layerManager.addLayer('background_med', {
            priority: LayerPriority.BACKGROUND_MED,
            enabled: true,
            update: (delta) => {},
            render: (ctx) => {
                this.tileMap.render(
                    ctx,
                    this.camera,
                    LayerPriority.BACKGROUND_MED
                );
            },
        });

        this.layerManager.addLayer('entities', {
            priority: LayerPriority.ENTITIES,
            enabled: true,
            update: (delta) => {
                this.player.update(delta);
                this.npcs.forEach((npc) => npc.update(delta));
                this.camera.update(delta);
            },
            render: (ctx) => {
                this.player.render(ctx, this.camera);
                this.npcs.forEach((npc) => npc.render(ctx, this.camera));
            },
        });

        this.layerManager.addLayer('foreground', {
            priority: LayerPriority.FOREGROUND,
            enabled: true,
            update: (delta) => {
                this.tileMap.update(delta);
            },
            render: (ctx) => {
                this.tileMap.render(ctx, this.camera, LayerPriority.FOREGROUND);
            },
        });

        this.layerManager.addLayer('ui', {
            priority: LayerPriority.UI,
            enabled: true,
            update: (delta) => {},
            render: (ctx) => {
                this.drawDebugInfo(ctx);
            },
        });
    }

    update(deltaTime: number) {
        const currentTime = Date.now();
        const elapsedTime = (currentTime - this.lastExecutionTime) / 1000;
        if (elapsedTime >= 10) {
            console.log('Scene Update - Delta:', deltaTime);
            this.lastExecutionTime = currentTime;
        }

        this.layerManager.update(deltaTime);
    }

    render(ctx: CanvasRenderingContext2D) {
        const offsetX = (ctx.canvas.width - this.camera.viewport.width) / 2;
        const offsetY = (ctx.canvas.height - this.camera.viewport.height) / 2;

        ctx.save();

        ctx.beginPath();
        ctx.rect(
            offsetX,
            offsetY,
            this.camera.viewport.width,
            this.camera.viewport.height
        );
        ctx.clip();
        ctx.imageSmoothingEnabled = false;
        this.layerManager.render(ctx);
        ctx.restore();
    }

    private drawDebugInfo(ctx: CanvasRenderingContext2D): void {
        //this.drawCameraBorders(ctx);
        //this.drawBorderTiles(ctx);
    }

    drawCameraBorders(ctx: CanvasRenderingContext2D): void {
        const offsetX = (ctx.canvas.width - this.camera.viewport.width) / 2;
        const offsetY = (ctx.canvas.height - this.camera.viewport.height) / 2;

        ctx.fillStyle = 'red';
        ctx.font = '12px Arial';
        ctx.fillText(
            `Position: X:${Math.floor(
                (this.player.position.x - 5) / 32
            )}, Y:${Math.floor((this.player.position.y - 5) / 32)}`,
            offsetX + 10,
            offsetY + 25
        );
        ctx.fillText(
            `Camera: X:${this.camera.position.x.toFixed(
                0
            )}px, Y:${this.camera.position.y.toFixed(0)}px`,
            offsetX + 10,
            offsetY + 45
        );

        ctx.save();
        ctx.strokeStyle = 'red'; // Color del borde
        ctx.lineWidth = 2; // Grosor del borde
        ctx.strokeRect(
            offsetX,
            offsetY,
            this.camera.viewport.width,
            this.camera.viewport.height
        );
        ctx.restore();
    }

    private drawBorderTiles(ctx: CanvasRenderingContext2D): void {
        const tileSize = 32;
        const startCol = 0;
        const startRow = 0;
        const endCol = Math.ceil(
            (this.player.position.x + this.camera.viewport.width) / tileSize
        );
        const endRow = Math.ceil(
            (this.player.position.y + this.camera.viewport.height) / tileSize
        );

        ctx.save();

        for (let row = startRow; row < endRow; row++) {
            for (let col = startCol; col < endCol; col++) {
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 1;
                const x = col * tileSize - this.camera.position.x;
                const y = row * tileSize - this.camera.position.y;
                ctx.strokeRect(x, y, tileSize, tileSize);
                const text = `${row} - ${col}`;
                const textMetrics = ctx.measureText(text);
                const textWidth = textMetrics.width;
                const textHeight = 9;
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.fillRect(x + 2, y + 2, textWidth, textHeight);
                ctx.fillStyle = 'black';
                ctx.font = `9px Arial`;
                ctx.fillText(text, x + 2, y + 10);
            }
        }
        ctx.restore();
    }
}
