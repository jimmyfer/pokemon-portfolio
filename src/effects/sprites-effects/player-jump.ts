import { GameContext } from '@/core/engine/game-context';
import { GameStateManager } from '@/core/systems/game-state-manager';
import { Camera } from '@/rendering/camera';
import { AnimatedSprite, SpriteSheet } from '@/rendering/sprite-sheet';
import { Vector2D } from '@/types/sprite-sheet';
import { Effect } from '../effect';
import { PlayerJumpSequence } from '@/types/effects';
import { GameEvent } from '@/types/game-event';
import { GAME_CANVAS } from '@/core/engine/canvas-token';
import { EventSystem } from '@/core/systems/event-system';

export class PlayerJumpEffect extends Effect<PlayerJumpSequence> {
    public position: Vector2D = { x: 0, y: 0 };
    private sprite: AnimatedSprite;
    private targetPosition: Vector2D;
    private startPosition: Vector2D;
    private flipX: boolean = false;
    private scale: number;
    private readonly movementSpeed: number = 100;
    private isMoving = false;
    private hasReachedTarget = false;
    private gameStateManager: GameStateManager;
    private elapsedTime = 0;
    private jumpHeight: number = 34;
    private jumpDuration: number = 0.6;
    private hidden = false;

    constructor() {
        super(0, 0);
        const gameContext = GameContext.getInstance();
        this.scale = gameContext.getTilesScale();
        this.gameStateManager = gameContext.getBean(GameStateManager);
        this.eventSystem = gameContext.getBean(EventSystem);
        this.startPosition = this.gameStateManager.getState().player.position;

        this.targetPosition = {
            x: this.startPosition.x,
            y: this.startPosition.y + 64,
        };

        this.position = this.gameStateManager.getState().player.position;

        this.elapsedTime = 0;

        this.sprite = new AnimatedSprite(
            this.assetManager.getSpriteSheet('player_effect')
        );

        this.configureAnimations(
            this.assetManager.getSpriteSheet('player_effect')
        );

        this.animationSequences.set(PlayerJumpSequence.JUMP_DOWN, {
            duraction: 0.8,
            animations: ['walk_down_first', 'down', 'walk_down_second', 'down'],
            quantity: 999,
        });

        this.gameStateManager.subscribe(() => {
            this.updatePlayerEffectState();
        });
    }

    private configureAnimations(spriteSheet: SpriteSheet): void {
        spriteSheet.defineAnimation({
            name: 'down',
            frames: [[[0]]],
            frameRate: 0,
            loop: false,
        });

        spriteSheet.defineAnimation({
            name: 'walk_down_first',
            frames: [[[6]]],
            frameRate: 0,
            loop: false,
        });

        spriteSheet.defineAnimation({
            name: 'walk_down_second',
            frames: [[[3]]],
            frameRate: 0,
            loop: false,
        });
    }

    update(deltaTime: number): void {
        this.sprite.update(deltaTime);
    }

    render(): void {
        if (this.hidden) {
            return;
        }

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

    private moveTowardsTarget(deltaSeconds: number): boolean {
        this.elapsedTime += deltaSeconds;
        const t = Math.min(this.elapsedTime / this.jumpDuration, 1);

        const deltaX = this.targetPosition.x - this.startPosition.x;
        const deltaY = this.targetPosition.y - this.startPosition.y;

        this.position.x = this.startPosition.x + deltaX * t;
        this.position.y =
            this.startPosition.y +
            deltaY * t -
            this.jumpHeight * Math.sin(t * Math.PI);

        this.isMoving = t < 1;

        if (t >= 1) {
            this.hasReachedTarget = true;
            return true;
        }
        return false;
    }

    private updatePlayerState(): void {
        if (!this.isMoving && !this.hasReachedTarget) {
            this.position = this.gameStateManager.getState().player.position;
        }

        this.gameStateManager.updateState((state) => ({
            ...state,
            player: {
                ...state.player,
                hidden: true,
                canMove: false,
            },
        }));
    }

    private updatePlayerEffectState(): void {
        if (!this.isMoving && !this.hasReachedTarget) {
            this.position = this.gameStateManager.getState().player.position;
        }
    }

    private executeAnimation(
        deltaTime: number,
        duration: number,
        animations: any,
        quantity: number,
        deltaSeconds: number
    ): void {
        const playerOnTarget = this.moveTowardsTarget(deltaSeconds);
        if (playerOnTarget) {
            this.updateEffectEndState();
            this.eventSystem.emit('PLAYER_JUMPED', {});
        }
        if (this.isMoving) {
            this.sprite.playSequence(deltaTime, duration, animations, quantity);
        }
    }

    public playSequence(deltaTime: number, sequence: PlayerJumpSequence): void {
        const deltaSeconds = deltaTime / 1000;

        const animData = this.animationSequences.get(sequence);
        if (
            !animData ||
            !animData.duraction ||
            !animData.animations ||
            !animData.quantity
        )
            return;

        this.updatePlayerState();

        this.executeAnimation(
            deltaTime,
            animData.duraction,
            animData.animations,
            animData.quantity,
            deltaSeconds
        );
    }

    private updateEffectEndState(): void {
        this.gameStateManager.updateState((state) => ({
            ...state,
            player: {
                ...state.player,
                position: {
                    x: this.position.x,
                    y: this.position.y,
                },
                hidden: false,
                canMove: true,
            },
        }));
        this.hidden = true;
    }
}
