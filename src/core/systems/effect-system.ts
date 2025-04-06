import { Vector2D } from "@/types/sprite-sheet";
import { TriggerAction, TriggerCondition } from "@/types/trigger";
import { GameContext } from "../engine/game-context";
import { Camera } from "@/rendering/camera";

export class EffectSystem {
  public triggers: EffectTrigger[] = [];
  private cooldowns: Map<EffectTrigger, number> = new Map();

  addTrigger(trigger: EffectTrigger): void {
    this.triggers.push(trigger);
  }

  update(playerPos: Vector2D, deltaTime: number): void {
    this.triggers.forEach((trigger) => {
      const lastActivation = this.cooldowns.get(trigger) || 0;
      const camera = GameContext.getInstance().getBean(Camera);

      if (
        (Date.now() - lastActivation > trigger.cooldown &&
          trigger.conditions.every((c) => c.isMet(playerPos, camera)))) {
        trigger.action.execute(deltaTime);
        this.cooldowns.set(trigger, Date.now());
      }
    });
  }
}

export class EffectTrigger {
  constructor(
    public conditions: TriggerCondition[],
    public action: TriggerAction,
    public cooldown: number = 0
  ) {}
}