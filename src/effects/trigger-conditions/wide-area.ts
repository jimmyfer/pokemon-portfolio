import { GameContext } from '@/core/engine/game-context';
import { GameStateManager } from '@/core/systems/game-state-manager';
import { Vector2D } from '@/types/sprite-sheet';
import { TriggerCondition } from '@/types/trigger';

export class WideAreaTriggerCondition implements TriggerCondition {
    constructor(
        private area: { x: number; y: number; width: number; height: number },
        private tileSize: number
    ) {}

    isMet(): boolean {
        const gameStateManager =
            GameContext.getInstance().getBean(GameStateManager);
        const playerState = gameStateManager.getState().player;
        return (
            playerState.position.x >= this.area.x * this.tileSize &&
            playerState.position.x <=
                (this.area.x + this.area.width) * this.tileSize &&
            playerState.position.y >= this.area.y * this.tileSize &&
            playerState.position.y <=
                (this.area.y + this.area.height) * this.tileSize
        );
    }
}
