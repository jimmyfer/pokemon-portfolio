import { GameContext } from '@/core/engine/game-context';
import { LayerPriority } from '@/types/render-types';
import { Player } from '@/game/player/player';
import { Camera } from '@/rendering/camera';
import { LayerManager } from '@/rendering/layer-manager';
import { GameScene } from '@/scenes/game-scene';
import { Input } from '@/input/input-manager';
import { WorldManager } from '@/core/engine/world-manager';
import { GAME_CANVAS } from '@/core/engine/canvas-token';
import { TransitionManager } from '@/core/systems/transition-manager';

export class OverworldScene extends GameScene {
    private camera: Camera;
    private player: Player;

    private layerManager: LayerManager;
    private worldManager: WorldManager;
    private transitionManager: TransitionManager;

    constructor() {
        super();

        const gameContext = GameContext.getInstance();
        this.layerManager = gameContext.getBean(LayerManager);
        this.camera = gameContext.getBean(Camera);
        this.worldManager = gameContext.getBean(WorldManager);
        this.transitionManager = gameContext.getBean(TransitionManager);

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
            update: (delta) => {
                this.player.update(delta);
                this.camera.update(delta);
                this.worldManager.update(delta);
            },
            render: () => {
                this.worldManager.render(LayerPriority.BACKGROUND);
            },
        });

        this.layerManager.addLayer({
            priority: LayerPriority.BACKGROUND_LOW,
            enabled: true,
            render: () => {
                this.worldManager.render(LayerPriority.BACKGROUND_LOW);
            },
        });

        this.layerManager.addLayer({
            priority: LayerPriority.BACKGROUND_MED,
            enabled: true,
            render: () => {
                this.worldManager.render(LayerPriority.BACKGROUND_MED);
            },
        });

        this.layerManager.addLayer({
            priority: LayerPriority.BACKGROUND_HIGH,
            enabled: true,
            render: () => {
                this.worldManager.render(LayerPriority.BACKGROUND_HIGH);
            },
        });

        this.layerManager.addLayer({
            priority: LayerPriority.ENTITIES_LOW,
            enabled: true,
            render: () => {
                this.worldManager.render(LayerPriority.ENTITIES_LOW);
            },
        });

        this.layerManager.addLayer({
            priority: LayerPriority.ENTITIES_MED,
            enabled: true,
            render: () => {
                this.player.render();
            },
        });

        this.layerManager.addLayer({
            priority: LayerPriority.ENTITIES_HIGH,
            enabled: true,
            render: () => {
                this.worldManager.render(LayerPriority.ENTITIES_HIGH);
            },
        });

        this.layerManager.addLayer({
            priority: LayerPriority.FOREGROUND,
            enabled: true,
            render: () => {
                this.worldManager.render(LayerPriority.FOREGROUND);
            },
        });

        this.layerManager.addLayer({
            priority: LayerPriority.WORLD_EFFECTS,
            enabled: true,
            render: () => {
                this.worldManager.render(LayerPriority.WORLD_EFFECTS);
            },
        });

        this.layerManager.addLayer({
            priority: LayerPriority.UI,
            enabled: true,
            render: () => {
                //this.drawDebugInfo();
            },
        });
    }

    update(deltaTime: number) {
        this.layerManager.update(deltaTime);
        this.transitionManager.update(deltaTime);
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.imageSmoothingEnabled = false;
        this.layerManager.render();
        this.transitionManager.render();
        ctx.restore();
    }

    private drawDebugInfo(): void {
        this.drawBorderTiles();
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
