import { TransitionEffect } from '@/types/transition-effects';
import { Injectable } from '../decorators/injectable';
import { GameContext } from '../engine/game-context';
import { EventSystem } from './event-system';
import { TRANSICION_CANVAS } from '../engine/canvas-token';
import { OpacityTransitionEffect } from '../transitions/opacity-transition';
import { PageComponent } from '@/types/page-component';

@Injectable()
export class TransitionManager {
    private currentEffect: TransitionEffect | null;
    private transitionType: 'map' | 'page' | 'page-closed' | null = null;
    private transitionProgress: number = 0;
    private transitionDuration: number = 500;
    private transitionPhase: 'closing' | 'opening' | 'waiting' | null = null;
    private targetMapId: string | null = null;

    private eventSystem: EventSystem;
    private gameContext: GameContext;

    constructor() {
        this.gameContext = GameContext.getInstance();
        this.eventSystem = this.gameContext.getBean(EventSystem);
        this.initialize();
    }

    private initialize() {
        this.eventSystem.on(
            'MAP_TRANSITION',
            (data: { to: string; effect?: TransitionEffect }) =>
                this.handleMapTransition(data)
        );

        this.eventSystem.on(
            'PAGE_TRANSITION',
            (data: {
                component: PageComponent;
                itemName: string;
                effect?: TransitionEffect;
            }) => this.handlePageTransition(data)
        );

        this.eventSystem.on('PAGE_CLOSED_TRANSITION', () =>
            this.handlePageClosedTransition()
        );

        this.eventSystem.on('MAP_TRANSITION_READY', () =>
            this.handleTransitionClosedReady()
        );
    }

    private handleMapTransition(data: {
        to: string;
        effect?: TransitionEffect;
        effectParams?: Record<string, any>;
    }) {
        this.transitionType = 'map';
        this.targetMapId = data.to;
        this.startTransition(data.effect || new OpacityTransitionEffect());
    }

    private handlePageTransition(data: {
        component: PageComponent;
        itemName: string;
        effect?: TransitionEffect;
    }) {
        this.transitionType = 'page';
        this.startTransition(data.effect || new OpacityTransitionEffect());
        this.eventSystem.emit('PAGE_TRANSITION_STARTED', {
            component: data.component,
            itemName: data.itemName,
        });
    }

    private handlePageClosedTransition() {
        this.transitionType = 'page-closed';
        this.startTransition(new OpacityTransitionEffect());
    }

    private startTransition(effect: TransitionEffect) {
        this.currentEffect = effect;
        this.transitionProgress = 0;
        this.transitionPhase = 'closing';

        this.eventSystem.emit('TRANSITION_START', {});

        this.currentEffect.initialize();
    }

    update(deltaTime: number) {
        if (!this.currentEffect || !this.transitionPhase) return;

        this.transitionProgress += deltaTime / this.transitionDuration;
        this.transitionProgress = Math.min(this.transitionProgress, 1);

        switch (this.transitionPhase) {
            case 'closing':
                this.currentEffect.update(this.transitionProgress);
                if (this.transitionProgress >= 1) this.handleTransitionClosed();
                break;

            case 'opening':
                this.currentEffect.update(1 - this.transitionProgress);
                if (this.transitionProgress >= 1)
                    this.handleTransitionComplete();
                break;
        }
    }

    private handleTransitionComplete() {
        if (!this.currentEffect) return;

        this.eventSystem.emit('TRANSITION_END', {});

        if (this.transitionType === 'map') {
            this.eventSystem.emit('MAP_TRANSITION_COMPLETE', {});
        } else if (this.transitionType === 'page') {
            this.eventSystem.emit('PAGE_TRANSITION_COMPLETE', {});
        } else if (this.transitionType === 'page-closed') {
            this.eventSystem.emit('PAGE_CLOSED_TRANSITION_COMPLETE', {});
        }

        this.transitionType = null;
        this.transitionPhase = null;
        this.currentEffect = null;
    }

    render() {
        if (!this.currentEffect) return;

        const ctx = this.gameContext.getBean(TRANSICION_CANVAS);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.currentEffect.render(ctx);
    }

    private handleTransitionClosedReady() {
        if (
            this.transitionPhase === 'waiting' &&
            this.transitionType === 'map'
        ) {
            this.transitionPhase = 'opening';
            this.transitionProgress = 0;
        }
    }

    private handleTransitionClosed() {
        if (this.transitionType === 'map') {
            this.eventSystem.emit('MAP_TRANSITION_CLOSED', {
                targetMapId: this.targetMapId,
            });
            this.transitionPhase = 'waiting';
        } else if (this.transitionType === 'page') {
            this.eventSystem.emit('PAGE_TRANSITION_CLOSED', {});
            this.transitionPhase = 'opening';
            this.transitionProgress = 0;
        } else if (this.transitionType === 'page-closed') {
            this.eventSystem.emit('PAGE_CLOSED_TRANSITION_CLOSED', {});
            this.transitionPhase = 'opening';
            this.transitionProgress = 0;
        }
    }
}
