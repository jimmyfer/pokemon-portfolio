import { Camera } from '@/rendering/camera';
import { AnimatedSprite, SpriteSheet } from '@/rendering/sprite-sheet';
import { Effect } from '../effect';
import { GameContext } from '@/core/engine/game-context';
import { LabDoorSequence } from '@/types/effects';
import { GAME_CANVAS } from '@/core/engine/canvas-token';

export enum DOEffectInitialState {
    EFFECT_OPENED = 'opened',
    EFFECT_CLOSED = 'closed',
}

export class LabDoorOpenEffect extends Effect<LabDoorSequence> {
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
        initialAnimation: DOEffectInitialState,
        flipX: boolean = false
    ) {
        super(x, y);
        this.flipX = flipX;
        this.scale = scale;

        const spriteSheet = this.assetManager.getSpriteSheet('lab_door');
        this.configureAnimations(spriteSheet);
        this.sprite = new AnimatedSprite(spriteSheet);
        this.sprite.play(initialAnimation);
    }

    private configureAnimations(spriteSheet: SpriteSheet): void {
        spriteSheet.defineAnimation({
            name: 'closed',
            frames: [
                [
                    [19655, 19656],
                    [19671, 19672],
                ],
            ],
            frameRate: 0,
            loop: false,
        });

        spriteSheet.defineAnimation({
            name: 'little_opened',
            frames: [
                [
                    [19653, 19654],
                    [19669, 19670],
                ],
            ],
            frameRate: 0,
            loop: false,
        });

        spriteSheet.defineAnimation({
            name: 'almost_opened',
            frames: [
                [
                    [19651, 19652],
                    [19667, 19668],
                ],
            ],
            frameRate: 0,
            loop: false,
        });

        spriteSheet.defineAnimation({
            name: 'opened',
            frames: [
                [
                    [19649, 19650],
                    [19665, 19666],
                ],
            ],
            frameRate: 0,
            loop: false,
        });

        this.animationSequences.set(LabDoorSequence.OPEN_EFFECT, {
            duraction: 0.5,
            animations: ['closed', 'little_opened', 'almost_opened', 'opened'],
            quantity: 1,
        });

        this.animationSequences.set(LabDoorSequence.CLOSE_EFFECT, {
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
        const gameContext = GameContext.getInstance();
        const ctx = gameContext.getBean(GAME_CANVAS);
        const camera = gameContext.getBean(Camera);

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

        const tileWidth = this.sprite.spriteSheet.width * this.scale;
        const tileHeight = this.sprite.spriteSheet.height * this.scale;

        frame.tiles.forEach((row, rowIndex) => {
            row.forEach((tile, colIndex) => {
                const xOffset = this.flipX
                    ? (row.length - colIndex - 1) * tileWidth
                    : colIndex * tileWidth;

                const yOffset = rowIndex * tileHeight;

                const tileX = screenPos.x + xOffset;
                const tileY = screenPos.y + yOffset;

                this.sprite.spriteSheet.draw(
                    ctx,
                    tile,
                    tileX,
                    tileY,
                    this.flipX,
                    this.scale
                );
            });
        });
    }

    playSequence(deltaTime: number, sequence: LabDoorSequence): void {
        const { duraction, animations, quantity } =
            this.animationSequences.get(sequence) || {};
        if (!duraction || !animations || !quantity) return;

        this.sprite.playSequence(deltaTime, duraction, animations, quantity);
        this.sprite.update(deltaTime);
    }
}
