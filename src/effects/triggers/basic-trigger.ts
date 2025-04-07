import { Trigger, TriggerAction, TriggerCondition } from '@/types/trigger';

export class BasicTrigger implements Trigger {
    constructor(
        public action: TriggerAction,
        public overRideCondition: boolean,
        public conditions?: TriggerCondition[]
    ) {}

    render() {
        this.action.render();
    }

    update(deltaTime: number): void {
        if (this.overRideCondition) {
            this.action.execute(deltaTime);
        } else {
            if (!this.conditions)
                throw new Error('Single trigger without condition');

            if (this.conditions.every((c) => c.isMet(deltaTime))) {
                this.action.execute(deltaTime);
            }
        }
    }
}
