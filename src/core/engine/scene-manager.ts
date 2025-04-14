import { Injectable } from '@/core/decorators/injectable';
import { GameScene } from '../../scenes/game-scene';
import { SceneTransitionOptions } from '@/types/scene';

@Injectable()
export class SceneManager {
    private scenes: Map<string, GameScene> = new Map();
    public currentScene?: GameScene;

    constructor() {}

    addScene(name: string, scene: GameScene): void {
        this.scenes.set(name, scene);
        scene.setSceneManager(this);
    }

    async switchTo(name: string): Promise<void> {
        const nextScene = this.scenes.get(name)!;

        if (this.currentScene) {
            await this.currentScene.onExit();
        }
        this.currentScene = nextScene;
        await this.currentScene.onEnter();
    }

    update(deltaTime: number): void {
        this.currentScene?.update(deltaTime);
    }

    render(ctx: CanvasRenderingContext2D): void {
        this.currentScene?.render(ctx);
    }

    getCurrentScene(): GameScene | undefined {
        return this.currentScene;
    }
}
