import { GameConfig } from '@/types/game-config';
import { Layer } from '@/types/render-types';
import { GameContext } from '@/core/engine/game-context';
import { AssetManager } from '@/assets/assetsManager';
import { SceneManager } from '@/core/engine/scene-manager';
import { LayerManager } from '@/rendering/layer-manager';
import { OverworldScene } from '@/scenes/overworld-scene';
import { GameStateManager } from '../systems/game-state-manager';

export class GameEngine {
    public canvas: HTMLCanvasElement;
    private lastFrameTime: number = 0;

    private gameContext: GameContext;

    assetManager: AssetManager;

    sceneManager: SceneManager;

    gameStateManager: GameStateManager;

    private ctx!: CanvasRenderingContext2D;

    constructor(config: GameConfig) {
        this.canvas = document.getElementById(
            config.canvasId
        ) as HTMLCanvasElement;

        this.ctx = this.canvas.getContext('2d', { alpha: false })!;

        this.gameContext = GameContext.getInstance();
        this.gameContext.registerBean(
            CanvasRenderingContext2D,
            this.canvas.getContext('2d', { alpha: false })!
        );

        this.assetManager = this.gameContext.getBean(AssetManager);
        this.sceneManager = this.gameContext.getBean(SceneManager);
        this.gameStateManager = this.gameContext.getBean(GameStateManager);
        this.initializeCanvas();

        window.addEventListener('resize', () => this.handleResize());
        this.gameLoop = this.gameLoop.bind(this);
    }

    private initializeCanvas(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.handleResize();
    }

    async initialize() {
        this.gameStateManager.loadFromPersistentStorage();

        await this.loadAssets();
        this.sceneManager.addScene('overworld', new OverworldScene());
        await this.sceneManager.switchTo('overworld');
    }

    private async loadAssets() {
        await this.assetManager.loadSpriteSheet(
            'player',
            'assets/sprites/character_01.png',
            32,
            32
        );
        await this.assetManager.loadSpriteSheet(
            'player-effect',
            'assets/sprites/character_01.png',
            32,
            32
        );
        await this.assetManager.loadSpriteSheet(
            'sprites',
            'assets/sprites/sprites.png',
            16,
            16
        );
    }

    private gameLoop(timestamp: number) {
        const deltaTime = timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;

        this.sceneManager.currentScene?.update(deltaTime);

        this.ctx.save();
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.sceneManager.currentScene?.render(this.ctx);
        this.ctx.restore();

        requestAnimationFrame(this.gameLoop);
    }

    start() {
        requestAnimationFrame(this.gameLoop);
    }

    public handleResize(): void {
        const container = document.getElementById('game-container')!;

        this.canvas.style.transform = `scale(${GameContext.getInstance().getGameScale()})`;
        this.canvas.style.transformOrigin = 'top left';

        container.style.width = `${window.innerWidth}px`;
        container.style.height = `${window.innerHeight}px`;
    }
}
