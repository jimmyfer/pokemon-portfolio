import { GameContext } from '@/core/engine/game-context';

export function Injectable(): ClassDecorator {
    return (target: any) => {
        GameContext.getInstance().registerBean(target, new target());
    };
}
