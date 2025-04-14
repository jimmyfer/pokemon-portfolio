import { GameContext } from '@/core/engine/game-context';
import { EventSystem } from '@/core/systems/event-system';
import { GameStateManager } from '@/core/systems/game-state-manager';
import { MapTransitionEvent } from '@/types/game-event';
import { Trigger, TriggerCondition } from '@/types/trigger';

export class MapTransition implements Trigger {
    private eventEmited: boolean = false;

    constructor(
        public conditions: TriggerCondition[],
        private mapEvent: MapTransitionEvent
    ) {}

    update(): void {
        if (this.conditions.every((c) => c.isMet())) {
            if (!this.eventEmited) {
                const eventSystem =
                    GameContext.getInstance().getBean(EventSystem);
                GameContext.getInstance()
                    .getBean(GameStateManager)
                    .updateState((state) => ({
                        ...state,
                        player: {
                            ...state.player,
                            hidden: false,
                            canMove: false,
                        },
                    }));
                eventSystem.emit(this.mapEvent.type, this.mapEvent);
                this.eventEmited = true;
            }
        }
    }

    render(): void {}
}
