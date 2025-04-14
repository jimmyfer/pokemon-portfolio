import { AssetManager } from '@/assets/assetsManager';
import { GAME_CANVAS } from '@/core/engine/canvas-token';
import { GameContext } from '@/core/engine/game-context';
import { CollisionSystem } from '@/core/systems/collision-system';
import { GameStateManager } from '@/core/systems/game-state-manager';
import { Input } from '@/input/input-manager';
import { Camera } from '@/rendering/camera';
import { AnimatedSprite, SpriteSheet } from '@/rendering/sprite-sheet';
import { Vector2D } from '@/types/sprite-sheet';

export class Player {
    public position: Vector2D;
    private targetPosition: Vector2D;

    public sprite: AnimatedSprite;
    private currentAnimation: string = 'idle';
    private isMoving: boolean = false;
    private flipX: boolean = false;
    private tileSize: number;
    public scale: number;
    private readonly movementSpeed: number = 180;

    private hidden = false;
    private canMove = true;

    private isAligning: boolean = false;
    private alignProgress: number = 0;
    private alignAnimationDuration: number = 0;
    private currentAlignDirection: Vector2D = { x: 0, y: 0 };
    private lastDirection: Vector2D = { x: 0, y: 0 };

    private gameStateManager: GameStateManager;
    private assetManager: AssetManager;
    private collisionSystem: CollisionSystem;

    constructor() {
        const gameContext = GameContext.getInstance();
        this.tileSize = gameContext.getTileSize();
        this.scale = gameContext.getTilesScale();
        this.assetManager = GameContext.getInstance().getBean(AssetManager);
        this.collisionSystem = gameContext.getBean(CollisionSystem);
        this.gameStateManager = gameContext.getBean(GameStateManager);
        this.gameStateManager.subscribe(() => {
            this.updatePlayerState();
        });

        const xPlayerPosition =
            this.gameStateManager.getState().player.position.x;
        const yPlayerPosition =
            this.gameStateManager.getState().player.position.y;

        this.position = this.snapToTileCenter({
            x: xPlayerPosition,
            y: yPlayerPosition,
        });

        this.targetPosition = { ...this.position };

        this.configureAnimations(this.assetManager.getSpriteSheet('player'));
        this.sprite = new AnimatedSprite(
            this.assetManager.getSpriteSheet('player')
        );

        this.sprite.play('idle');
    }

    updatePlayerState() {
        const { hidden, canMove, position } =
            this.gameStateManager.getState().player;
        this.hidden = hidden;
        this.canMove = canMove;
        if (this.position.x != position.x && this.position.y != position.y) {
            this.position = this.snapToTileCenter(position);
            this.targetPosition = this.position;
        }
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

        spriteSheet.defineAnimation({
            name: 'walk-left',
            frames: [2, 5, 2, 5],
            frameRate: 8,
            loop: true,
        });

        spriteSheet.defineAnimation({
            name: 'walk-up',
            frames: [4, 7, 4, 7],
            frameRate: 8,
            loop: true,
        });

        spriteSheet.defineAnimation({
            name: 'walk-down',
            frames: [3, 6, 3],
            frameRate: 8,
            loop: true,
        });

        spriteSheet.defineAnimation({
            name: 'left-align',
            frames: [2, 5],
            frameRate: 16,
            loop: true,
        });

        spriteSheet.defineAnimation({
            name: 'up-align',
            frames: [1, 7],
            frameRate: 16,
            loop: true,
        });

        spriteSheet.defineAnimation({
            name: 'down-align',
            frames: [0, 3],
            frameRate: 16,
            loop: true,
        });
    }

    private snapToTileCenter(position: Vector2D): Vector2D {
        return {
            x:
                Math.floor(position.x / this.tileSize) * this.tileSize +
                this.tileSize / 2,
            y:
                Math.floor(position.y / this.tileSize) * this.tileSize +
                this.tileSize / 2,
        };
    }

    private getCurrentTile(): Vector2D {
        return {
            x: Math.floor(this.position.x / this.tileSize),
            y: Math.floor(this.position.y / this.tileSize),
        };
    }

    update(deltaTime: number): void {
        if (!this.canMove) return;
        const deltaSeconds = deltaTime / 1000;

        if (this.isAligning) {
            this.alignProgress += deltaTime;
            this.sprite.update(deltaTime);

            if (this.alignProgress >= this.alignAnimationDuration) {
                this.isAligning = false;
                this.alignProgress = 0;
            }
            return;
        }

        if (!this.isMoving) {
            const direction = Input.movementDirection;

            if (direction.x !== 0 || direction.y !== 0) {
                if (
                    direction.x !== this.lastDirection.x ||
                    direction.y !== this.lastDirection.y
                ) {
                    this.playAlignAnimation(direction);
                    this.lastDirection = direction;
                    this.currentAlignDirection = direction;
                    this.isAligning = true;
                } else {
                    this.startMovement(direction);
                }
                this.lastDirection = direction;
            }
        }

        if (this.isMoving) {
            this.moveTowardsTarget(deltaSeconds);
            this.sprite.update(deltaTime);
        }
    }

    private moveTowardsTarget(deltaSeconds: number): void {
        const dx = this.targetPosition.x - this.position.x;
        const dy = this.targetPosition.y - this.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const moveDistance = this.movementSpeed * deltaSeconds;

        if (distance > 0) {
            const ratio = Math.min(moveDistance / distance, 1);
            this.position.x += dx * ratio;
            this.position.y += dy * ratio;
        }

        if (distance <= moveDistance) {
            this.position = { ...this.targetPosition };
            this.isMoving = false;
            this.sprite.play(this.currentAnimation);
        }

        this.gameStateManager.updateState((state) => {
            return {
                ...state,
                player: {
                    ...state.player,
                    position: {
                        x: this.position.x,
                        y: this.position.y,
                    },
                },
            };
        });
    }

    private updateMovementAnimation(direction: Vector2D): void {
        if (direction.x !== 0) {
            this.flipX = direction.x > 0;
            this.sprite.play('walk-left');
            this.currentAnimation = 'walk-left';
        } else if (direction.y > 0) {
            this.sprite.play('walk-down');
            this.currentAnimation = 'walk-down';
        } else if (direction.y < 0) {
            this.sprite.play('walk-up');
            this.currentAnimation = 'walk-up';
        }
    }

    private playAlignAnimation(direction: Vector2D): void {
        let animationName = '';
        if (direction.x > 0) {
            animationName = 'left-align';
            this.flipX = true;
        } else if (direction.x < 0) {
            animationName = 'left-align';
            this.flipX = false;
        } else if (direction.y > 0) {
            animationName = 'down-align';
        } else if (direction.y < 0) {
            animationName = 'up-align';
        }

        this.sprite.play(animationName);
        this.currentAnimation = animationName;
        const animation = this.sprite.spriteSheet.getAnimation(animationName);
        this.alignAnimationDuration =
            (animation.frames.length / animation.frameRate) * 1000;
    }

    private startMovement(direction: Vector2D): void {
        const currentTile = this.getCurrentTile();
        const targetTile = {
            x: currentTile.x + direction.x,
            y: currentTile.y + direction.y,
        };

        if (
            this.collisionSystem.isColliding(
                targetTile.x * this.tileSize,
                targetTile.y * this.tileSize
            )
        ) {
            return;
        }

        this.targetPosition = {
            x: targetTile.x * this.tileSize + this.tileSize / 2,
            y: targetTile.y * this.tileSize + this.tileSize / 2,
        };
        this.isMoving = true;
        this.updateMovementAnimation(direction);
    }

    render(): void {
        const frame = this.sprite.getCurrentFrame();

        const gameContext = GameContext.getInstance();
        const ctx = gameContext.getBean(GAME_CANVAS);
        const camera = gameContext.getBean(Camera);

        const screenPos = {
            x:
                this.position.x -
                camera.position.x -
                (frame.width * this.scale) / 2,
            y:
                this.position.y -
                camera.position.y -
                (frame.height * this.scale) / 2,
        };

        if (!this.hidden)
            this.sprite.spriteSheet.draw(
                ctx,
                frame,
                screenPos.x,
                screenPos.y,
                this.flipX,
                this.scale
            );
    }
}
