import { Vector2D } from "@/types/sprite-sheet";
import { TriggerAction, TriggerCondition } from "@/types/trigger";

export interface Trigger {
  update(deltaTime: number, ...args: any): void;
  action?: TriggerAction;
  render(): void;
}

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
      if (!this.conditions) throw new Error("Single trigger without condition");

      if (this.conditions.every((c) => c.isMet(deltaTime))) {
        this.action.execute(deltaTime);
      }
    }
  }
}

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

  update(deltaTime: number, playerPos: Vector2D): void {
    this.elapsedTime += deltaTime;
    const trigger = this.triggers[this.currentIndex];

    if (this.conditions.every((c) => c.isMet(playerPos))) {
      trigger.update(deltaTime);
      if (this.elapsedTime >= this.cooldown && this.currentIndex < this.triggers.length - 1) {
        this.elapsedTime = 0;
        this.currentIndex++;
      }
    }
  }

  render() {
    const currentTrigger = this.triggers[this.currentIndex];
    currentTrigger.render();
  }

  isComplete(): boolean {
    return this.currentIndex >= this.triggers.length;
  }
}

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
