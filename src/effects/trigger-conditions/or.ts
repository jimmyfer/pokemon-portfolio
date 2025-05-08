import { TriggerCondition } from '@/types/trigger';

export class OrTriggerCondition implements TriggerCondition {
    constructor(private conditions: TriggerCondition[]) {}

    isMet(...args: unknown[]): boolean {
        return this.conditions.some((condition) => condition.isMet(...args));
    }
}
