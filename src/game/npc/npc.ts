import { GameContext } from '@/core/engine/game-context';
import { AssetManager } from '@/assets/assetsManager';
import { AnimatedSprite, SpriteSheet } from '@/rendering/sprite-sheet';
import { Vector2D } from '@/types/sprite-sheet';
import { TriggerCondition } from '@/types/trigger';
import { EffectSystem } from '@/core/systems/effect-system';
import { BasicTrigger } from '@/effects/triggers/basic-trigger';
import { GameStateManager } from '@/core/systems/game-state-manager';
import { CollisionSystem } from '@/core/systems/collision-system';
import { GAME_CANVAS } from '@/core/engine/canvas-token';
import { Camera } from '@/rendering/camera';
import { EventSystem } from '@/core/systems/event-system';
import { NPCBehavior, NPCConfig } from '@/types/npc';
import { NPCSkins, SkinType } from './npc-skins';

export class NPC {
    public position: Vector2D;
    private targetPosition: Vector2D;
    private isMoving: boolean = false;
    private movementSpeed: number;
    private currentDirection: Vector2D = { x: 0, y: 0 };
    private isInteracting: boolean = false;
    private movementTimer: number = 0;
    private initialPosition: Vector2D;
    private movementRange: number;
    private behaviorState: NPCBehavior;

    private sprite: AnimatedSprite;
    private currentAnimation: string;
    private flipX: boolean = false;

    private scale: number;
    private tileSize: number;
    private config: NPCConfig;

    private effectSystem: EffectSystem;
    private gameStateManager: GameStateManager;
    private collisionSystem: CollisionSystem;
    private assetManager: AssetManager;
    private eventSystem: EventSystem;

    constructor(config: NPCConfig) {
        const gameContext = GameContext.getInstance();

        this.assetManager = gameContext.getBean(AssetManager);
        this.gameStateManager = gameContext.getBean(GameStateManager);
        this.collisionSystem = gameContext.getBean(CollisionSystem);
        this.eventSystem = gameContext.getBean(EventSystem);

        this.effectSystem = new EffectSystem();

        this.tileSize = gameContext.getTileSize();
        this.scale = gameContext.getTilesScale();

        this.config = config;
        this.behaviorState = config.behavior || 'static';

        this.position = this.snapToTileCenter(config.position);

        this.configureAnimations(this.assetManager.getSpriteSheet('npcs'));
        this.sprite = new AnimatedSprite(
            this.assetManager.getSpriteSheet(config.spriteSheet)
        );

        this.targetPosition = { ...this.position };
        this.movementSpeed = config.movementSpeed || 40;

        this.initialPosition = { ...this.position };
        this.movementRange = config.movementRange || 3;

        this.currentAnimation = config.initialAnimation;
        this.sprite.play(this.currentAnimation);

        this.setupInteractionTrigger(config.interactionTrigger(this));

        this.eventSystem.on('CLOSE_DIALOG', () => this.stopInteraction());
    }

    private stopInteraction(): void {
        this.gameStateManager.unlockPlayerMovement();
        setTimeout(() => {
            this.isInteracting = false;
            this.eventSystem.emit('KEY_PRESS_LIBERATION', {});
        }, 500);
    }

    private snapToTileCenter(position: Vector2D): Vector2D {
        return {
            x:
                Math.floor((position.x * this.tileSize) / this.tileSize) *
                    this.tileSize +
                this.tileSize / 2,
            y:
                Math.floor((position.y * this.tileSize) / this.tileSize) *
                    this.tileSize +
                this.tileSize / 2,
        };
    }

    private configureAnimations(spriteSheet: SpriteSheet): void {
        const skinType = this.config.skin || SkinType.WOMAN_01;
        const skinConfig = NPCSkins[skinType];

        Object.entries(skinConfig.animations).forEach(
            ([animationName, frames]) => {
                spriteSheet.defineAnimation({
                    name: animationName,
                    frames: frames,
                    frameRate: 4,
                    loop: true,
                });
            }
        );
    }

    private setupInteractionTrigger(condition: TriggerCondition): void {
        this.effectSystem.addTrigger(
            new BasicTrigger(
                {
                    execute: (deltaTime: number) => {
                        if (!this.isInteracting) {
                            this.handleInteraction();
                            this.isInteracting = true;
                        }
                    },
                    render: () => {},
                },
                false,
                [condition]
            )
        );
    }

    private handleInteraction(): void {
        switch (this.config.interactionType) {
            case 'dialogue':
                this.triggerDialogue();
                break;
        }
    }

    private triggerDialogue(): void {
        this.facePlayer();
        this.gameStateManager.lockPlayerMovement();
        this.eventSystem.emit('START_DIALOG', {
            name: this.config.name,
            dialogue: this.config.dialogue,
        });
    }

    private facePlayer(): void {
        const playerPosition = this.gameStateManager.getState().player.position;
        const npcPosition = this.position;

        const deltaX = playerPosition.x - npcPosition.x;
        const deltaY = playerPosition.y - npcPosition.y;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0) {
                this.flipX = true;
                this.currentAnimation = 'left';
            } else {
                this.flipX = false;
                this.currentAnimation = 'left';
            }
        } else {
            if (deltaY > 0) {
                this.currentAnimation = 'down';
            } else {
                this.currentAnimation = 'up';
            }
        }

        this.sprite.play(this.currentAnimation);
    }

    private updateMovement(deltaTime: number): void {
        if (this.behaviorState !== 'wandering' || this.isInteracting) return;

        if (!this.isMoving) {
            this.movementTimer += deltaTime;

            if (this.movementTimer > 10000) {
                this.movementTimer = 0;
                this.changeDirection();
            }
        }

        if (this.isMoving) {
            this.moveTowardsTarget(deltaTime);
        }
    }

    getIdleAnimation(currentAnimation: string): string {
        switch (currentAnimation) {
            case 'walkLeft':
            case 'left':
                return 'left';
            case 'walkRight':
            case 'right':
                return 'right';
            case 'walkUp':
            case 'up':
                return 'up';
            case 'walkDown':
            case 'down':
                return 'down';
        }

        return 'down';
    }

    private changeDirection(): void {
        const directions = [
            { x: 0, y: -1 }, // Up
            { x: 0, y: 1 }, // Down
            { x: -1, y: 0 }, // Left
            { x: 1, y: 0 }, // Rigth
        ];

        const validDirections = directions.filter((dir) => {
            const newTile = {
                x: Math.floor(this.position.x / this.tileSize) + dir.x,
                y: Math.floor(this.position.y / this.tileSize) + dir.y,
            };

            const newDistanceX = Math.abs(
                newTile.x - Math.floor(this.initialPosition.x / this.tileSize)
            );
            const newDistanceY = Math.abs(
                newTile.y - Math.floor(this.initialPosition.y / this.tileSize)
            );

            return (
                newDistanceX <= this.movementRange &&
                newDistanceY <= this.movementRange
            );
        });

        if (validDirections.length === 0) return;

        const randomDir =
            validDirections[Math.floor(Math.random() * validDirections.length)];
        this.startMovement(randomDir);
    }

    private startMovement(direction: Vector2D): void {
        const currentTile = {
            x: Math.floor(this.position.x / this.tileSize),
            y: Math.floor(this.position.y / this.tileSize),
        };

        const targetTile = {
            x: currentTile.x + direction.x,
            y: currentTile.y + direction.y,
        };

        if (
            !this.isWithinMovementRange(targetTile) ||
            this.collisionSystem.isColliding(
                targetTile.x * this.tileSize,
                targetTile.y * this.tileSize
            )
        ) {
            return;
        }

        this.currentDirection = direction;
        this.startActualMovement();
    }

    private isWithinMovementRange(targetTile: Vector2D): boolean {
        const initialTile = {
            x: Math.floor(this.initialPosition.x / this.tileSize),
            y: Math.floor(this.initialPosition.y / this.tileSize),
        };

        const dx = Math.abs(targetTile.x - initialTile.x);
        const dy = Math.abs(targetTile.y - initialTile.y);

        return dx <= this.movementRange && dy <= this.movementRange;
    }

    private startActualMovement(): void {
        const currentTile = {
            x: Math.floor(this.position.x / this.tileSize),
            y: Math.floor(this.position.y / this.tileSize),
        };

        const targetTile = {
            x: currentTile.x + this.currentDirection.x,
            y: currentTile.y + this.currentDirection.y,
        };

        const targetWorldPos = {
            x: targetTile.x * this.tileSize + this.tileSize / 2,
            y: targetTile.y * this.tileSize + this.tileSize / 2,
        };

        this.collisionSystem.registerMovement(this.config.id, targetWorldPos);

        if (
            this.collisionSystem.isColliding(
                targetTile.x * this.tileSize,
                targetTile.y * this.tileSize,
                this.config.id
            )
        ) {
            this.collisionSystem.clearMovement(this.config.id);
            return;
        }

        this.targetPosition = targetWorldPos;
        this.isMoving = true;
        this.playMovementAnimation(this.currentDirection);
    }

    private playMovementAnimation(direction: Vector2D): void {
        let animationName = '';

        if (direction.x > 0) {
            animationName = 'walkRight';
            this.flipX = true;
        } else if (direction.x < 0) {
            animationName = 'walkLeft';
            this.flipX = false;
        } else if (direction.y > 0) {
            animationName = 'walkDown';
        } else {
            animationName = 'walkUp';
        }

        this.currentAnimation = animationName;
        this.sprite.play(animationName);
    }

    private moveTowardsTarget(deltaTime: number): void {
        const deltaSeconds = deltaTime / 1000;
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
            this.currentAnimation = this.getIdleAnimation(
                this.currentAnimation
            );
            this.sprite.play(this.currentAnimation);
            this.collisionSystem.clearMovement(this.config.id);
        }
    }

    update(deltaTime: number): void {
        this.sprite.update(deltaTime);
        this.effectSystem.update(deltaTime);
        this.updateMovement(deltaTime);
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

                let yOffset = rowIndex * tileHeight;

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
}
