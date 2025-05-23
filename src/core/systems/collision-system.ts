import { TileMap } from '@/rendering/tile-map';
import { Injectable } from '../decorators/injectable';
import { Vector2D } from '@/types/sprite-sheet';
import { GameStateManager } from './game-state-manager';
import { GameContext } from '../engine/game-context';

@Injectable()
export class CollisionSystem {
    private tileMap: TileMap;
    private gameStateManager: GameStateManager;
    private movingEntities: Map<string, Vector2D> = new Map();

    constructor() {
        const gameContext = GameContext.getInstance();
        this.gameStateManager = gameContext.getBean(GameStateManager);
    }

    public registerMovement(entityId: string, targetPosition: Vector2D): void {
        this.movingEntities.set(entityId, targetPosition);
    }

    public clearMovement(entityId: string): void {
        this.movingEntities.delete(entityId);
    }

    public isColliding(x: number, y: number, ignoreEntity?: string): boolean {
        const tileCoords = this.worldToTile(x, y);
        return (
            this.checkTileCollision(tileCoords.x, tileCoords.y) ||
            this.isEntityInPosition(x, y, ignoreEntity)
        );
    }

    private isEntityInPosition(
        x: number,
        y: number,
        ignoreEntity?: string
    ): boolean {
        const playerInPosition = this.isPlayerInPosition(x, y);

        const movingEntityInPosition = Array.from(
            this.movingEntities.entries()
        ).some(([entityId, position]) => {
            if (entityId === ignoreEntity) return false;
            const targetTile = this.worldToTile(position.x, position.y);
            const currentTile = this.worldToTile(x, y);
            return (
                targetTile.x === currentTile.x && targetTile.y === currentTile.y
            );
        });

        return playerInPosition || movingEntityInPosition;
    }

    setTileMap(tileMap: TileMap): void {
        this.tileMap = tileMap;
    }

    private worldToTile(x: number, y: number): Vector2D {
        const tileSize = this.tileMap.getTileSize();
        return {
            x: Math.floor(x / tileSize),
            y: Math.floor(y / tileSize),
        };
    }

    private checkTileCollision(tileX: number, tileY: number): boolean {
        const collisionGrid = this.tileMap.getCollisionGrid();
        if (!collisionGrid.length) {
            return false;
        }

        if (tileY >= collisionGrid.length || tileY < 0) return true;
        if (tileX >= collisionGrid[0].length || tileX < 0) return true;

        return collisionGrid[tileY][tileX];
    }

    private isPlayerInPosition(x: number, y: number): boolean {
        const { position } = this.gameStateManager.getState().player;
        const playerTile = this.worldToTile(position.x, position.y);

        const targetTile = this.worldToTile(x, y);

        return playerTile.x === targetTile.x && playerTile.y === targetTile.y;
    }
}
