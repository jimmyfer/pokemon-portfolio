import { GameContext } from '@/core/engine/game-context';
import { GameStateManager } from '@/core/systems/game-state-manager';
import { TriggerCondition } from '@/types/trigger';
import { NPC } from '@/game/npc/npc';

export class NPCRelativePositionTriggerCondition implements TriggerCondition {
    private gameStateManager: GameStateManager;

    constructor(
        private npc: NPC,
        private verticalRelation: 'above' | 'below'
    ) {
        const gameContext = GameContext.getInstance();
        this.gameStateManager = gameContext.getBean(GameStateManager);
    }

    isMet(): boolean {
        const playerPosition = this.gameStateManager.getState().player.position;

        const verticalDifference = this.npc.position.y - playerPosition.y;

        if (this.verticalRelation === 'above') {
            return verticalDifference <= 0;
        }

        return verticalDifference > 0;
    }
}
