import { GameContext } from '@/core/engine/game-context';
import { EventSystem } from '@/core/systems/event-system';
import { GameStateManager } from '@/core/systems/game-state-manager';
import { MapTransitionEvent } from '@/types/game-event';
import { Trigger, TriggerCondition } from '@/types/trigger';

export class MapTransitionTrigger implements Trigger {
    private eventEmited: boolean = false;
    private eventSystem: EventSystem;
    private gameStateManager: GameStateManager;

    constructor(
        public conditions: TriggerCondition[],
        private mapEvent: MapTransitionEvent
    ) {
        const gameContext = GameContext.getInstance();
        this.eventSystem = gameContext.getBean(EventSystem);
        this.gameStateManager = gameContext.getBean(GameStateManager);
    }

    update(): void {
        if (this.conditions.every((c) => c.isMet())) {
            if (!this.eventEmited) {
                this.gameStateManager.updateState((state) => {
                    return {
                        ...state,
                        player: {
                            ...state.player,
                            canMove: false,
                        },
                    };
                });
                this.eventSystem.emit(this.mapEvent.type, this.mapEvent);
                this.eventEmited = true;
            }
        }
    }

    render(): void {}
}
