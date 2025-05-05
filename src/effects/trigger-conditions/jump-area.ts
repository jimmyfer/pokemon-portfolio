import { GameContext } from '@/core/engine/game-context';
import { GameStateManager } from '@/core/systems/game-state-manager';
import { TriggerCondition } from '@/types/trigger';

export class JumpAreaTriggerCondition implements TriggerCondition {
    constructor(
        private area: { x: number; y: number; width: number; height: number },
        private tileSize: number
    ) {}

    isMet(): boolean {
        const gameStateManager =
            GameContext.getInstance().getBean(GameStateManager);
        const playerState = gameStateManager.getState().player;
        const playerX = playerState.position.x;
        const playerY = playerState.position.y;

        const playerTileX = Math.floor(playerX / this.tileSize);
        const playerTileY = Math.floor(playerY / this.tileSize);

        const isInAreaX =
            playerTileX >= this.area.x &&
            playerTileX < this.area.x + this.area.width;
        const isInAreaY =
            playerTileY >= this.area.y &&
            playerTileY < this.area.y + this.area.height;
        if (!isInAreaX || !isInAreaY) {
            return false;
        }

        const tileCenterX = playerTileX * this.tileSize + this.tileSize / 2;
        const tileCenterY = playerTileY * this.tileSize + this.tileSize / 2;

        const isInCenterX =
            playerX >= tileCenterX - 1 && playerX <= tileCenterX + 1;
        const isInCenterY =
            playerY >= tileCenterY - 1 && playerY <= tileCenterY + 1;

        return isInCenterX && isInCenterY;
    }
}
