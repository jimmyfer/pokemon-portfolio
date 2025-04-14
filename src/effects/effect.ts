import { AssetManager } from '@/assets/assetsManager';
import { GameContext } from '@/core/engine/game-context';
import { GameEvent } from '@/types/game-event';
import { Vector2D } from '@/types/sprite-sheet';
import { EventSystem } from '../core/systems/event-system';

type EffectSequence = {
    duraction: number;
    animations: string[];
    quantity: number;
};

export abstract class Effect<SequenceTypes> {
    public position: Vector2D;
    protected eventAtEnd: GameEvent | undefined;
    protected assetManager: AssetManager;
    protected animationSequences: Map<string, EffectSequence> = new Map();
    protected eventSystem: EventSystem;

    constructor(x: number, y: number, eventAtEnd?: GameEvent) {
        this.position = { x, y };
        this.eventAtEnd = eventAtEnd;
        const gameContext = GameContext.getInstance();
        this.assetManager = gameContext.getBean(AssetManager);
        this.eventSystem = gameContext.getBean(EventSystem);
    }

    public abstract update(deltaTime: number): void;

    public abstract render(): void;

    public abstract playSequence(
        deltaTime: number,
        sequence: SequenceTypes
    ): void;
}
