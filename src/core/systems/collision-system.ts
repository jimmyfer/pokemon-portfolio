import { TileMap } from "@/rendering/tile-map";
import { Injectable } from "../decorators/injectable";
import { Vector2D } from "@/types/sprite-sheet";

@Injectable()
export class CollisionSystem {
    private tileMap: TileMap;
    
    constructor() {}

    setTileMap(tileMap: TileMap): void {
        this.tileMap = tileMap;
    }

    public isColliding(x: number, y: number): boolean {
        const tileCoords = this.worldToTile(x, y);
        return this.checkTileCollision(tileCoords.x, tileCoords.y);
    }

    private worldToTile(x: number, y: number): Vector2D {
        const tileSize = this.tileMap.getTileSize();
        return {
            x: Math.floor(x / tileSize),
            y: Math.floor(y / tileSize)
        };
    }

    private checkTileCollision(tileX: number, tileY: number): boolean {
        const collisionGrid = this.tileMap.getCollisionGrid();
        if(!collisionGrid.length) {
            return false;
        }
        
        if (tileY >= collisionGrid.length || tileY < 0) return true;
        if (tileX >= collisionGrid[0].length || tileX < 0) return true;
        
        return collisionGrid[tileY][tileX];
    }
}