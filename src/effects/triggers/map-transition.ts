import { GameContext } from '@/core/engine/game-context';
import { EventSystem } from '@/core/systems/event-system';
import { GameStateManager } from '@/core/systems/game-state-manager';
import { MapTransitionEvent } from '@/types/game-event';
import { Trigger, TriggerCondition } from '@/types/trigger';

export class MapTransitionTrigger implements Trigger {
    private eventEmited: boolean = false;
    private eventSystem: EventSystem;

    constructor(
        public conditions: TriggerCondition[],
        private mapEvent: MapTransitionEvent
    ) {
        this.eventSystem = GameContext.getInstance().getBean(EventSystem);
    }

    update(): void {
        if (this.conditions.every((c) => c.isMet())) {
            if (!this.eventEmited) {
                this.eventSystem.emit(this.mapEvent.type, this.mapEvent);
                this.eventEmited = true;
            }
        }
    }

    render(): void {}
}
