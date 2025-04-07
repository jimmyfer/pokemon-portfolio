import { Injectable } from '@/core/decorators/injectable';
import { GameScene } from '../../scenes/game-scene';
import { SceneTransitionOptions } from '@/types/scene';

@Injectable()
export class SceneManager {
    private scenes: Map<string, GameScene> = new Map();
    public currentScene?: GameScene;
    private transitionInProgress: boolean = false;
    private transitionStartTime: number = 0;
    private transitionType: string = 'fade';
    private transitionDuration: number = 1000;
    private transitionColor: string = '#000000';
    private transitionDirection: string = 'left';

    constructor() {}

    addScene(name: string, scene: GameScene): void {
        this.scenes.set(name, scene);
        scene.setSceneManager(this);
    }

    // TODO: Not fully implemented yet
    async switchTo(
        name: string,
        options:
            | SceneTransitionOptions
            | undefined = {} as SceneTransitionOptions
    ): Promise<void> {
        if (this.transitionInProgress || !this.scenes.has(name)) return;

        const nextScene = this.scenes.get(name)!;
        this.transitionInProgress = true;
        this.transitionType = options.type || 'fade';
        this.transitionDuration = options.duration || 1000;
        this.transitionColor = options.color || '#000000';
        this.transitionDirection = options.direction || 'left';
        this.transitionStartTime = performance.now();

        await this.playTransitionOut();

        if (this.currentScene) {
            await this.currentScene.onExit();
        }
        this.currentScene = nextScene;
        await this.currentScene.onEnter();

        await this.playTransitionIn();
        this.transitionInProgress = false;
    }

    private async playTransitionOut(): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, this.transitionDuration / 2);
        });
    }

    private async playTransitionIn(): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, this.transitionDuration / 2);
        });
    }

    update(deltaTime: number): void {
        if (this.transitionInProgress) {
            this.updateTransition(deltaTime);
        } else {
            this.currentScene?.update(deltaTime);
        }
    }

    render(ctx: CanvasRenderingContext2D): void {
        this.currentScene?.render(ctx);
        if (this.transitionInProgress) {
            this.renderTransition(ctx);
        }
    }

    // TODO: Make it work
    private updateTransition(deltaTime: number): void {
        const elapsed = performance.now() - this.transitionStartTime;
        const progress = Math.min(elapsed / this.transitionDuration, 1);

        switch (this.transitionType) {
            case 'fade':
                break;
            case 'slide':
                break;
        }
    }

    // TODO: Make it work
    private renderTransition(ctx: CanvasRenderingContext2D): void {
        const elapsed = performance.now() - this.transitionStartTime;
        const progress = Math.min(elapsed / this.transitionDuration, 1);

        ctx.save();
        ctx.globalAlpha =
            this.transitionType === 'fade' ? Math.min(progress * 2, 1) : 1;

        switch (this.transitionType) {
            case 'fade':
                ctx.fillStyle = this.transitionColor;
                ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                break;

            case 'slide':
                const offset = progress * ctx.canvas.width;
                ctx.translate(
                    this.transitionDirection === 'left' ? -offset : offset,
                    0
                );
                break;
        }

        ctx.restore();
    }

    getCurrentScene(): GameScene | undefined {
        return this.currentScene;
    }
}
