import { Camera } from '@/rendering/camera';
import { AnimatedSprite, SpriteSheet } from '@/rendering/sprite-sheet';
import { Effect } from './effect';
import { GameContext } from '@/core/engine/game-context';

export enum DoorSequence {
    OPEN_EFFECT = 'OPEN_EFFECT',
    CLOSE_EFFECT = 'CLOSE_EFFECT',
}

export enum DOEffectInitialState {
    EFFECT_OPENED = 'opened',
    EFFECT_CLOSED = 'closed',
}

export class DoorOpenEffect extends Effect<DoorSequence> {
    private sprite: AnimatedSprite;
    private flipX: boolean = false;
    private scale: number;

    public static initialState = {
        open: DOEffectInitialState.EFFECT_OPENED,
        close: DOEffectInitialState.EFFECT_CLOSED,
    };

    constructor(
        x: number,
        y: number,
        scale: number,
        initialAnimation: DOEffectInitialState
    ) {
        super(x, y);
        this.scale = scale;

        const spriteSheet = this.assetManager.getSpriteSheet('sprites');
        this.configureAnimations(spriteSheet);
        this.sprite = new AnimatedSprite(spriteSheet);
        this.sprite.play(initialAnimation);
    }

    private configureAnimations(spriteSheet: SpriteSheet): void {
        spriteSheet.defineAnimation({
            name: 'closed',
            frames: [19442, 19443],
            frameRate: 0,
            loop: false,
        });

        spriteSheet.defineAnimation({
            name: 'little_opened',
            frames: [19446, 19447],
            frameRate: 0,
            loop: false,
        });

        spriteSheet.defineAnimation({
            name: 'almost_opened',
            frames: [19448, 19449],
            frameRate: 0,
            loop: false,
        });

        spriteSheet.defineAnimation({
            name: 'opened',
            frames: [19444, 19445],
            frameRate: 0,
            loop: false,
        });

        this.animationSecuences.set(DoorSequence.OPEN_EFFECT, {
            duraction: 0.5,
            animations: ['closed', 'little_opened', 'almost_opened', 'opened'],
            quantity: 1,
        });

        this.animationSecuences.set(DoorSequence.CLOSE_EFFECT, {
            duraction: 0.5,
            animations: ['opened', 'almost_opened', 'little_opened', 'closed'],
            quantity: 1,
        });
    }

    update(deltaTime: number): void {
        this.sprite.update(deltaTime);
    }

    render(): void {
        const frame = this.sprite.getCurrentFrame();

        const ctx = GameContext.getInstance().getBean(CanvasRenderingContext2D);
        const camera = GameContext.getInstance().getBean(Camera);

        const screenPos = {
            x: Math.ceil(
                this.position.x -
                    camera.position.x -
                    (frame.width * this.scale) / 2
            ),
            y: Math.ceil(
                this.position.y -
                    camera.position.y -
                    (frame.height * this.scale) / 2
            ),
        };

        this.sprite.spriteSheet.draw(
            ctx,
            frame,
            screenPos.x,
            screenPos.y,
            this.flipX,
            this.scale
        );
    }

    playSequence(sequence: DoorSequence, deltaTime: number): void {
        const { duraction, animations, quantity } =
            this.animationSecuences.get(sequence) || {};
        if (!duraction || !animations || !quantity) return;

        this.sprite.playSequence(deltaTime, duraction, animations, quantity);
        this.sprite.update(deltaTime);
    }
}
