import { GameConfig } from '@/types/game-config';
import { GameContext } from '@/core/engine/game-context';
import { AssetManager } from '@/assets/assetsManager';
import { SceneManager } from '@/core/engine/scene-manager';
import { OverworldScene } from '@/scenes/overworld-scene';
import { GameStateManager } from '../systems/game-state-manager';
import { GAME_CANVAS, TRANSICION_CANVAS } from './canvas-token';

export class GameEngine {
    public canvasGame: HTMLCanvasElement;
    public canvasTransicion: HTMLCanvasElement;
    private lastFrameTime: number = 0;

    private gameContext: GameContext;

    assetManager: AssetManager;

    sceneManager: SceneManager;

    gameStateManager: GameStateManager;

    private canvasGameCtx: CanvasRenderingContext2D;

    constructor(config: GameConfig) {
        this.canvasGame = document.getElementById(
            config.canvasId
        ) as HTMLCanvasElement;

        this.canvasTransicion = document.getElementById(
            config.canvasTransicionId
        ) as HTMLCanvasElement;

        this.canvasGameCtx = this.canvasGame.getContext('2d', {
            alpha: false,
        })!;

        this.gameContext = GameContext.getInstance();

        this.gameContext.registerBean(
            GAME_CANVAS,
            this.canvasGame.getContext('2d', { alpha: false })!
        );
        this.gameContext.registerBean(
            TRANSICION_CANVAS,
            this.canvasTransicion.getContext('2d', { alpha: true })!
        );

        this.assetManager = this.gameContext.getBean(AssetManager);
        this.sceneManager = this.gameContext.getBean(SceneManager);
        this.gameStateManager = this.gameContext.getBean(GameStateManager);
        this.initializeCanvas();

        window.addEventListener('resize', () => this.handleResize());
        this.gameLoop = this.gameLoop.bind(this);
    }

    private initializeCanvas(): void {
        this.canvasGame.width = window.screen.width;
        this.canvasGame.height = window.screen.height;
        this.canvasTransicion.width = window.screen.width;
        this.canvasTransicion.height = window.screen.height;
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
            'sprites',
            'assets/sprites/sprites.png',
            16,
            16
        );
        await this.assetManager.loadSpriteSheet(
            'player',
            'assets/sprites/character_01.png',
            32,
            32
        );
        await this.assetManager.loadSpriteSheet(
            'player_effect',
            'assets/sprites/character_01.png',
            32,
            32
        );
        await this.assetManager.loadSpriteSheet(
            'door',
            'assets/sprites/sprites.png',
            16,
            16
        );
        await this.assetManager.loadSpriteSheet(
            'lab_door',
            'assets/sprites/sprites.png',
            16,
            16
        );
    }

    private gameLoop(timestamp: number) {
        const deltaTime = timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;
        this.sceneManager.currentScene?.update(deltaTime);

        this.canvasGameCtx.save();

        this.canvasGameCtx.clearRect(
            0,
            0,
            window.screen.width,
            window.screen.height
        );
        this.sceneManager.currentScene?.render(this.canvasGameCtx);
        this.canvasGameCtx.restore();

        requestAnimationFrame(this.gameLoop);
    }

    start() {
        requestAnimationFrame(this.gameLoop);
    }

    public handleResize(): void {
        const container = document.getElementById('game-container')!;

        this.canvasGame.style.transform = `scale(${GameContext.getInstance().getGameScale()})`;
        this.canvasGame.style.transformOrigin = 'top left';

        this.canvasTransicion.style.transform = `scale(${GameContext.getInstance().getGameScale()})`;
        this.canvasTransicion.style.transformOrigin = 'top left';

        container.style.width = `${window.screen.width}px`;
        container.style.height = `${window.screen.height}px`;
    }
}
