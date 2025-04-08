import { Trigger, TriggerCondition } from '@/types/trigger';

export class EnterIntoBuilding implements Trigger {
    public currentIndex = 0;
    private elapsedTime = 0;
    private readonly cooldown: number;
    private activeTriggers: Trigger[] = [];

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
                !this.activeTriggers.some(
                    (trigger) => trigger === this.triggers[this.currentIndex]
                )
            ) {
                this.activeTriggers.push(this.triggers[this.currentIndex]);
            }
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
        if (this.conditions.every((c) => c.isMet())) {
            this.activeTriggers.forEach((trigger) => trigger.render());
        }
    }
}
