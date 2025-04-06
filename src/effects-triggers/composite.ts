import { TriggerCondition } from "@/types/trigger";

export class CompositeTrigger implements TriggerCondition {
    constructor(private conditions: TriggerCondition[]) {}
  
    isMet(...args: unknown[]): boolean {
      return this.conditions.every((condition) => condition.isMet(...args));
    }
  }