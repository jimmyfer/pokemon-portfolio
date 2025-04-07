import { Trigger, TriggerCondition } from '@/types/trigger';

// TODO: Refactor to not depend on cooldown timer
export class EventChain implements Trigger {
    public currentIndex = 0;
    private elapsedTime = 0;
    private readonly cooldown: number;

    constructor(
        public conditions: TriggerCondition[],
        public triggers: Trigger[],
        cooldown: number
    ) {
        this.cooldown = cooldown;
    }

    update(deltaTime: number): void {
        const trigger = this.triggers[this.currentIndex];

        if (this.conditions.every((c) => c.isMet())) {
            this.elapsedTime += deltaTime;
            trigger.update(deltaTime);
            if (
                this.elapsedTime >= this.cooldown &&
                this.currentIndex < this.triggers.length - 1
            ) {
                this.elapsedTime = 0;
                this.currentIndex++;
            }
        }
    }

    render() {
        const currentTrigger = this.triggers[this.currentIndex];
        if (this.conditions.every((c) => c.isMet())) {
            currentTrigger.render();
        }
    }

    isComplete(): boolean {
        return this.currentIndex >= this.triggers.length;
    }
}
