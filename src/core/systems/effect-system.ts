import { Trigger } from '@/types/trigger';

export class EffectSystem {
    public triggers: Trigger[] = [];

    addTrigger(trigger: Trigger): void {
        this.triggers.push(trigger);
    }

    update(deltaTime: number): void {
        this.triggers.forEach((trigger) => trigger.update(deltaTime));
    }

    render() {
        this.triggers.forEach((trigger) => trigger.render());
    }
}
