import { GameContext } from '@/core/engine/game-context';
import { GameStateManager } from '@/core/systems/game-state-manager';
import { Trigger, TriggerCondition } from '@/types/trigger';

export class EnterIntoBuildingTrigger implements Trigger {
    public currentIndex = 0;
    private elapsedTime = 0;
    private readonly cooldown: number;
    private activeTriggers: Trigger[] = [];
    private gameStateManager: GameStateManager;

    private triggerStarted = false;

    constructor(
        public conditions: TriggerCondition[],
        public triggers: Trigger[],
        cooldown: number
    ) {
        this.cooldown = cooldown;
        const gameContext = GameContext.getInstance();
        this.gameStateManager = gameContext.getBean(GameStateManager);
    }

    update(deltaTime: number): void {
        const trigger = this.triggers[this.currentIndex];

        if (this.conditions.every((c) => c.isMet())) {
            if (!this.triggerStarted) {
                this.gameStateManager.updateState((state) => ({
                    ...state,
                    player: {
                        ...state.player,
                        canMove: false,
                    },
                }));
                this.triggerStarted = true;
            }
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
