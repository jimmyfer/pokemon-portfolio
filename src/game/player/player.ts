import { AssetManager } from '@/assets/assetsManager';
import { GAME_CANVAS } from '@/core/engine/canvas-token';
import { GameContext } from '@/core/engine/game-context';
import { CollisionSystem } from '@/core/systems/collision-system';
import { EventSystem } from '@/core/systems/event-system';
import { GameStateManager } from '@/core/systems/game-state-manager';
import { Input } from '@/input/input-manager';
import { Camera } from '@/rendering/camera';
import { AnimatedSprite, SpriteSheet } from '@/rendering/sprite-sheet';
import { Vector2D } from '@/types/sprite-sheet';

export class Player {
    public position: Vector2D;
    private targetPosition: Vector2D;

    public sprite: AnimatedSprite;
    private isMoving: boolean = false;
    private intendedDirection: Vector2D = { x: 0, y: 0 };
    private flipX: boolean = false;
    private tileSize: number;
    public scale: number;
    private readonly movementSpeed: number = 120;

    private currentAnimation = 'idle';

    private playerOffsetX = 0;
    private playerOffsetY = 0;

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
    private eventSystem: EventSystem;

    constructor() {
        this.initialize();
    }

    initialize(): void {
        const gameContext = GameContext.getInstance();
        this.tileSize = gameContext.getTileSize();
        this.scale = gameContext.getTilesScale();
        this.assetManager = GameContext.getInstance().getBean(AssetManager);
        this.collisionSystem = gameContext.getBean(CollisionSystem);
        this.gameStateManager = gameContext.getBean(GameStateManager);
        this.eventSystem = gameContext.getBean(EventSystem);

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

        this.eventSystem.on('TRANSITION_START', () =>
            this.lockPlayerMovement()
        );
        this.eventSystem.on('TRANSITION_END', () =>
            this.unlockPlayerMovement()
        );

        this.sprite.play('idle');
    }

    updatePlayerState() {
        const { hidden, canMove, position, spritePosition } =
            this.gameStateManager.getState().player;
        this.hidden = hidden;
        this.canMove = canMove;
        this.canMove = canMove;

        this.playAnimation(spritePosition);

        if (this.position.x != position.x || this.position.y != position.y) {
            this.position = this.snapToTileCenter(position);
            this.targetPosition = this.position;
        }
    }

    private configureAnimations(spriteSheet: SpriteSheet): void {
        spriteSheet.defineAnimation({
            name: 'idle',
            frames: [[[0]]],
            frameRate: 0,
            loop: false,
        });

        spriteSheet.defineAnimation({
            name: 'up',
            frames: [[[1]]],
            frameRate: 0,
            loop: false,
        });

        spriteSheet.defineAnimation({
            name: 'down',
            frames: [[[0]]],
            frameRate: 0,
            loop: false,
        });

        spriteSheet.defineAnimation({
            name: 'left',
            frames: [[[2]]],
            frameRate: 0,
            loop: false,
        });

        spriteSheet.defineAnimation({
            name: 'right',
            frames: [[[2]]],
            frameRate: 0,
            loop: false,
        });

        spriteSheet.defineAnimation({
            name: 'walk-up-first',
            frames: [[[4]]],
            frameRate: 0,
            loop: false,
        });

        spriteSheet.defineAnimation({
            name: 'walk-up-second',
            frames: [[[7]]],
            frameRate: 0,
            loop: false,
        });

        spriteSheet.defineAnimation({
            name: 'walk-left',
            frames: [[[5]], [[2]], [[8]], [[2]]],
            frameRate: 8,
            loop: true,
        });

        spriteSheet.defineAnimation({
            name: 'walk-up',
            frames: [[[4]], [[1]], [[7]], [[1]]],
            frameRate: 8,
            loop: true,
        });

        spriteSheet.defineAnimation({
            name: 'walk-down',
            frames: [[[3]], [[0]], [[6]], [[0]]],
            frameRate: 8,
            loop: true,
        });

        spriteSheet.defineAnimation({
            name: 'left-align',
            frames: [[[2]], [[5]]],
            frameRate: 16,
            loop: true,
        });

        spriteSheet.defineAnimation({
            name: 'up-align',
            frames: [[[1]], [[7]]],
            frameRate: 16,
            loop: true,
        });

        spriteSheet.defineAnimation({
            name: 'down-align',
            frames: [[[0]], [[3]]],
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
        let spritePosition = { activeAnimation: this.currentAnimation };
        this.intendedDirection = Input.movementDirection;

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
            this.intendedDirection = Input.movementDirection;

            if (
                this.intendedDirection.x !== 0 ||
                this.intendedDirection.y !== 0
            ) {
                if (
                    this.intendedDirection.x !== this.lastDirection.x ||
                    this.intendedDirection.y !== this.lastDirection.y
                ) {
                    this.playAlignAnimation(
                        this.intendedDirection,
                        spritePosition
                    );
                    this.lastDirection = this.intendedDirection;
                    this.currentAlignDirection = this.intendedDirection;
                    this.isAligning = true;
                } else {
                    this.startMovement(this.intendedDirection, spritePosition);
                }
                this.lastDirection = this.intendedDirection;
            }
        }

        if (this.isMoving) {
            this.moveTowardsTarget(deltaSeconds);
            this.sprite.update(deltaTime);
        }

        if (
            !this.isMoving &&
            !this.isAligning &&
            this.intendedDirection.x === 0 &&
            this.intendedDirection.y === 0
        ) {
            this.gameStateManager.updateState((state) => {
                return {
                    ...state,
                    player: {
                        ...state.player,
                        spritePosition: this.getIdleAnimation(
                            spritePosition.activeAnimation
                        ),
                        position: {
                            x: this.position.x,
                            y: this.position.y,
                        },
                    },
                };
            });
        } else {
            this.gameStateManager.updateState((state) => {
                return {
                    ...state,
                    player: {
                        ...state.player,
                        spritePosition: spritePosition.activeAnimation,
                        position: {
                            x: this.position.x,
                            y: this.position.y,
                        },
                    },
                };
            });
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
        }
    }

    private updateMovementAnimation(
        direction: Vector2D,
        spritePosition: { activeAnimation: string }
    ): void {
        if (direction.x !== 0) {
            this.flipX = direction.x > 0;
            spritePosition.activeAnimation = 'walk-left';
        } else if (direction.y > 0) {
            spritePosition.activeAnimation = 'walk-down';
        } else if (direction.y < 0) {
            spritePosition.activeAnimation = 'walk-up';
        }
    }

    private playAlignAnimation(
        direction: Vector2D,
        spritePosition: { activeAnimation: string }
    ): void {
        if (direction.x > 0) {
            spritePosition.activeAnimation = 'left-align';
            this.flipX = true;
        } else if (direction.x < 0) {
            spritePosition.activeAnimation = 'left-align';
            this.flipX = false;
        } else if (direction.y > 0) {
            spritePosition.activeAnimation = 'down-align';
        } else if (direction.y < 0) {
            spritePosition.activeAnimation = 'up-align';
        }

        const animation = this.sprite.spriteSheet.getAnimation(
            spritePosition.activeAnimation
        );
        this.alignAnimationDuration =
            (animation.frames.length / animation.frameRate) * 1000;
    }

    private startMovement(
        direction: Vector2D,
        spritePosition: { activeAnimation: string }
    ): void {
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
        this.updateMovementAnimation(direction, spritePosition);
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

        if (this.hidden) {
            return;
        }

        frame.tiles.forEach((row, rowIndex) => {
            row.forEach((tile, colIndex) => {
                const xOffset =
                    (this.flipX
                        ? (row.length - colIndex - 1) * tileWidth
                        : colIndex * tileWidth) + this.playerOffsetX;

                let yOffset = rowIndex * tileHeight + this.playerOffsetY;

                if (
                    frame.currentAnimation === 'walk-left' &&
                    (frame.currentFrame == 0 || frame.currentFrame == 2)
                ) {
                    yOffset = yOffset + 2;
                }

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

    playAnimation(animation: string): void {
        if (this.currentAnimation != animation) {
            this.sprite.play(animation);
            this.currentAnimation = animation;
        }
    }

    getIdleAnimation(currentAnimation: string): string {
        switch (currentAnimation) {
            case 'walk-left':
            case 'left-align':
            case 'left':
                return 'left';
            case 'walk-up':
            case 'up-align':
            case 'up':
                return 'up';
            case 'walk-down':
            case 'down-align':
            case 'down':
                return 'down';
        }

        return 'up';
    }

    private lockPlayerMovement() {
        this.gameStateManager.updateState((state) => ({
            ...state,
            player: { ...state.player, canMove: false },
        }));
    }

    private unlockPlayerMovement() {
        this.gameStateManager.updateState((state) => ({
            ...state,
            player: { ...state.player, canMove: true },
        }));
    }
}
