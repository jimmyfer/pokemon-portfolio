import { GameContext } from '@/core/engine/game-context';
import { GameStateManager } from '@/core/systems/game-state-manager';
import { TriggerCondition } from '@/types/trigger';

export class PlayerPositionTriggerCondition implements TriggerCondition {
    private gameStateManager: GameStateManager;

    constructor(private playerAnimations: string[]) {
        const gameContext = GameContext.getInstance();
        this.gameStateManager = gameContext.getBean(GameStateManager);
    }

    isMet(): boolean {
        const spritePosition =
            this.gameStateManager.getState().player.spritePosition;
        return this.playerAnimations.some(
            (playerAnimation) => playerAnimation === spritePosition
        );
    }
}
