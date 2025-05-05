import { GameContext } from '@/core/engine/game-context';
import { EventSystem } from '@/core/systems/event-system';
import { Input } from '@/input/input-manager';
import { TriggerCondition } from '@/types/trigger';

export class KeyPressTriggerCondition implements TriggerCondition {
    private pressed: boolean = false;
    private eventSystem: EventSystem;

    constructor(private key: string) {
        const gameContext = GameContext.getInstance();
        this.eventSystem = gameContext.getBean(EventSystem);
        this.listenKeyPressLiberationEvent();
    }

    isMet(): boolean {
        if (Input.isKeyDown(this.key)) this.pressed = true;
        return this.pressed;
    }

    listenKeyPressLiberationEvent(): void {
        this.eventSystem.on('KEY_PRESS_LIBERATION', () => {
            this.pressed = false;
        });
    }
}
