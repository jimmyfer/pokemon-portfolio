import { GameContext } from '@/core/engine/game-context';
import { GameStateManager } from '@/core/systems/game-state-manager';
import { TriggerCondition } from '@/types/trigger';

export class BushAreaTriggerCondition implements TriggerCondition {
    constructor(
        private area: { x: number; y: number; width: number; height: number },
        private tileSize: number
    ) {}

    isMet(): boolean {
        const gameStateManager =
            GameContext.getInstance().getBean(GameStateManager);
        const playerState = gameStateManager.getState().player;

        const areaTopY = this.area.y * this.tileSize;

        const tileCenterOffsetY = Math.floor(this.tileSize / 2);

        const middleMinY = areaTopY + tileCenterOffsetY - 5;
        const middleMaxY = areaTopY + tileCenterOffsetY + 5;

        const isInVerticalMiddleBounds =
            playerState.position.y >= middleMinY &&
            playerState.position.y <= middleMaxY;
        const isInHorizontalBounds =
            playerState.position.x >= this.area.x * this.tileSize &&
            playerState.position.x <=
                (this.area.x + this.area.width) * this.tileSize;

        return isInHorizontalBounds && isInVerticalMiddleBounds;
    }
}
