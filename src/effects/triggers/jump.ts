import { Trigger, TriggerCondition } from '@/types/trigger';
import { PlayerJumpEffect } from '../sprites-effects/player-jump';
import { BasicTrigger } from './basic-trigger';
import { PlayerJumpSequence, SequenceTypes } from '@/types/effects';
import { EventSystem } from '@/core/systems/event-system';
import { GameContext } from '@/core/engine/game-context';

export class JumpTrigger implements Trigger {
    private trigger: Trigger | null = null;
    private eventSystem: EventSystem;

    constructor(
        public secuence: PlayerJumpSequence,
        public condition: TriggerCondition
    ) {
        const gameContext = GameContext.getInstance();
        this.eventSystem = gameContext.getBean(EventSystem);
        this.listenPlayerJumpEffectEndEvent();
    }

    update(deltaTime: number): void {
        if (this.condition.isMet()) {
            const playerJumpEffect = new PlayerJumpEffect();
            if (this.trigger === null) {
                this.trigger = new BasicTrigger(
                    {
                        execute: (deltaTime: number) =>
                            playerJumpEffect.playSequence(
                                deltaTime,
                                this.secuence
                            ),
                        render: () => {
                            playerJumpEffect.render();
                        },
                    },
                    true
                );
            }

            this.trigger.update(deltaTime);
        }
    }

    render() {
        this.trigger?.render();
    }

    listenPlayerJumpEffectEndEvent(): void {
        this.eventSystem.on('PLAYER_JUMPED', () => {
            this.trigger = null;
            this.eventSystem.emit('KEY_PRESS_LIBERATION', {});
        });
    }
}
