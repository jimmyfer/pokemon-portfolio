import { AssetManager } from '@/assets/assetsManager';
import { GameContext } from '@/core/engine/game-context';
import { Vector2D } from '@/types/sprite-sheet';

type EffectSequence = {
    duraction: number;
    animations: string[];
    quantity: number;
};

export abstract class Effect<SequenceTypes> {
    public position: Vector2D;
    protected assetManager: AssetManager;
    protected animationSequences: Map<string, EffectSequence> = new Map();

    constructor(x: number, y: number) {
        this.position = { x, y };
        this.assetManager = GameContext.getInstance().getBean(AssetManager);
    }

    public abstract update(deltaTime: number): void;

    public abstract render(): void;

    public abstract playSequence(
        deltaTime: number,
        sequence: SequenceTypes
    ): void;
}
