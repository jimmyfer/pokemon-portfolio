import { GameContext } from '@/core/engine/game-context';
import { GameStateManager } from '@/core/systems/game-state-manager';
import { Camera } from '@/rendering/camera';
import { AnimatedSprite, SpriteSheet } from '@/rendering/sprite-sheet';
import { Vector2D } from '@/types/sprite-sheet';
import { Effect } from '../effect';
import { PlayerMovementSequence } from '@/types/effects';
import { GameEvent } from '@/types/game-event';
import { GAME_CANVAS } from '@/core/engine/canvas-token';

export class PlayerMovementEffect extends Effect<PlayerMovementSequence> {
    public position: Vector2D = { x: 0, y: 0 };
    private sprite: AnimatedSprite;
    private targetPosition: Vector2D;
    private flipX: boolean = false;
    private tileSize: number;
    private scale: number;
    private readonly movementSpeed: number = 100;
    private isMoving = false;
    private hasReachedTarget = false;
    private gameStateManager: GameStateManager;
    private eventEmitted = false;

    constructor(target: Vector2D, eventAtEnd?: GameEvent) {
        super(0, 0, eventAtEnd);
        const gameContext = GameContext.getInstance();
        this.tileSize = gameContext.getTileSize();
        this.scale = gameContext.getTilesScale();
        this.gameStateManager = gameContext.getBean(GameStateManager);

        this.targetPosition = {
            x: target.x * this.tileSize + this.tileSize / 2,
            y: target.y * this.tileSize + this.tileSize / 2 - 6,
        };

        this.sprite = new AnimatedSprite(
            this.assetManager.getSpriteSheet('player-effect')
        );

        this.configureAnimations(
            this.assetManager.getSpriteSheet('player-effect')
        );

        this.animationSequences.set(PlayerMovementSequence.WALK_UP, {
            duraction: 0.4,
            animations: ['up', 'walk-up-first', 'walk-up-second'],
            quantity: 999,
        });
    }

    private configureAnimations(spriteSheet: SpriteSheet): void {
        spriteSheet.defineAnimation({
            name: 'idle',
            frames: [0, 0],
            frameRate: 8,
            loop: true,
        });

        spriteSheet.defineAnimation({
            name: 'up',
            frames: [1],
            frameRate: 0,
            loop: false,
        });

        spriteSheet.defineAnimation({
            name: 'walk-up-first',
            frames: [4],
            frameRate: 0,
            loop: false,
        });

        spriteSheet.defineAnimation({
            name: 'walk-up-second',
            frames: [7],
            frameRate: 0,
            loop: false,
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
        ctx.filter = 'brightness(70%)';
        this.sprite.spriteSheet.draw(
            ctx,
            frame,
            screenPos.x,
            screenPos.y,
            this.flipX,
            this.scale
        );
        ctx.filter = 'none';
    }

    private moveTowardsTarget(deltaSeconds: number): boolean {
        const dx = this.targetPosition.x - this.position.x;
        const dy = this.targetPosition.y - this.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const moveDistance = this.movementSpeed * deltaSeconds;

        if (distance > 0) {
            const ratio = Math.min(moveDistance / distance, 1);
            this.position.x += dx * ratio;
            this.position.y += dy * ratio;
            this.isMoving = true;
        }

        if (distance <= moveDistance) {
            this.position = { ...this.targetPosition };
            this.isMoving = false;
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

    private executeAnimation(
        deltaTime: number,
        duration: number,
        animations: any,
        quantity: number,
        deltaSeconds: number
    ): void {
        const playerOnTarget = this.moveTowardsTarget(deltaSeconds);
        if (playerOnTarget && this.eventAtEnd) {
            this.emitEffectEnd();
        }
        if (this.isMoving) {
            this.sprite.playSequence(deltaTime, duration, animations, quantity);
        }
    }

    public playSequence(
        deltaTime: number,
        sequence: PlayerMovementSequence
    ): void {
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

    private emitEffectEnd(): void {
        if (!this.eventEmitted && this.eventAtEnd) {
            this.eventSystem.emit(this.eventAtEnd.type, this.eventAtEnd);
            this.eventEmitted = true;
        }
    }
}
