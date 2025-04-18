import { GameConfig } from './types/game-config';
import { GameEngine } from './core/engine/game-engine';
import './html/index';

class GameBootstrapper {
    private gameEngine: GameEngine;
    private uiElements: Record<string, HTMLElement>;

    constructor() {
        this.uiElements = {
            loadingScreen: document.getElementById('loading-screen')!,
            progressBar: document.querySelector('.progress')!,
            dialogueBox: document.getElementById('dialogue-box')!,
            hud: document.getElementById('hud')!,
        };

        this.initializeEngine();
        this.setupGlobalListeners();
    }

    private initializeEngine(): void {
        const config: GameConfig = {
            canvasId: 'game-canvas',
            canvasTransicionId: 'transicion-canvas',
            uiElements: this.uiElements,
        };

        this.gameEngine = new GameEngine(config);
        this.startGame();
    }

    private async startGame(): Promise<void> {
        try {
            await this.gameEngine.initialize();
            this.gameEngine.start();
        } catch (error) {
            console.error('Failed to initialize game:', error);
        }
    }

    private setupGlobalListeners(): void {
        window.addEventListener('resize', () => this.handleResize());
        document.addEventListener('keydown', (e) => this.handleGlobalInput(e));
    }

    private handleResize(): void {
        this.gameEngine.handleResize();
    }

    private handleGlobalInput(event: KeyboardEvent): void {
        if (event.key === 'Escape') {
            this.togglePauseMenu();
        }
    }

    private togglePauseMenu(): void {}
}

document.addEventListener('DOMContentLoaded', () => new GameBootstrapper());
