import { GameContext } from '@/core/engine/game-context';
import { LayerPriority } from '@/types/render-types';
import { Player } from '@/game/player/player';
import { Camera } from '@/rendering/camera';
import { LayerManager } from '@/rendering/layer-manager';
import { GameScene } from '@/scenes/game-scene';
import { Input } from '@/input/input-manager';
import { WorldManager } from '@/core/engine/world-manager';
import { GAME_CANVAS } from '@/core/engine/canvas-token';

export class OverworldScene extends GameScene {
    private camera: Camera;
    private player: Player;
    private npcs: any[] = [];

    private layerManager: LayerManager;
    private worldManager: WorldManager;

    constructor() {
        super();

        const gameContext = GameContext.getInstance();
        this.layerManager = gameContext.getBean(LayerManager);
        this.camera = gameContext.getBean(Camera);
        this.worldManager = gameContext.getBean(WorldManager);

        this.player = new Player();
        this.initializeLayers();
    }

    async onEnter(): Promise<void> {
        await this.worldManager.initialize();
        this.initializeLayers();
        this.camera.follow(this.player);
    }

    private initializeLayers(): void {
        Input.initialize();

        this.layerManager.addLayer({
            priority: LayerPriority.BACKGROUND,
            enabled: true,
            update: (delta) => {},
            render: () => {
                this.worldManager.render(LayerPriority.BACKGROUND);
            },
        });

        this.layerManager.addLayer({
            priority: LayerPriority.BACKGROUND_LOW,
            enabled: true,
            update: (delta) => {},
            render: () => {
                this.worldManager.render(LayerPriority.BACKGROUND_LOW);
            },
        });

        this.layerManager.addLayer({
            priority: LayerPriority.BACKGROUND_MED,
            enabled: true,
            update: (delta) => {},
            render: () => {
                this.worldManager.render(LayerPriority.BACKGROUND_MED);
            },
        });

        this.layerManager.addLayer({
            priority: LayerPriority.ENTITIES,
            enabled: true,
            update: (delta) => {
                this.player.update(delta);
                this.npcs.forEach((npc) => npc.update(delta));
                this.camera.update(delta);
            },
            render: () => {
                this.player.render();
                this.npcs.forEach((npc) => npc.render());
            },
        });

        this.layerManager.addLayer({
            priority: LayerPriority.FOREGROUND,
            enabled: true,
            update: (delta) => {
                this.worldManager.update(delta);
            },
            render: () => {
                this.worldManager.render(LayerPriority.FOREGROUND);
            },
        });

        this.layerManager.addLayer({
            priority: LayerPriority.UI,
            enabled: true,
            update: (delta) => {},
            render: () => {
                //this.drawDebugInfo();
            },
        });
    }

    update(deltaTime: number) {
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
        this.layerManager.render();
        ctx.restore();
    }

    private drawDebugInfo(): void {
        this.drawCameraBorders();
        this.drawBorderTiles();
    }

    drawCameraBorders(): void {
        const ctx = GameContext.getInstance().getBean(GAME_CANVAS);
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

    private drawBorderTiles(): void {
        const ctx = GameContext.getInstance().getBean(GAME_CANVAS);
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
