import { SceneManager } from '@/core/engine/scene-manager';
import { SceneTransitionOptions } from '@/types/scene';

export abstract class GameScene {
    protected sceneManager?: SceneManager;

    setSceneManager(manager: SceneManager): void {
        this.sceneManager = manager;
    }

    abstract update(deltaTime: number): void;
    abstract render(ctx: CanvasRenderingContext2D): void;

    async onEnter(): Promise<void> {}

    async onExit(): Promise<void> {}

    protected transitionTo(
        sceneName: string,
        options?: SceneTransitionOptions
    ): void {
        this.sceneManager?.switchTo(sceneName, options);
    }
}
