import { PageComponent } from '@/types/page-component';
import { Injectable } from '../decorators/injectable';
import {
    AfterCloseHandler,
    BeforeCloseContext,
    BeforeCloseHandler,
} from '@/types/menu';

@Injectable()
export class MenuService {
    private currentComponent: PageComponent | null = null;

    private beforeCloseHandlers = new Set<BeforeCloseHandler>();
    private afterCloseHandlers = new Set<AfterCloseHandler>();

    onBeforeClose(handler: BeforeCloseHandler): void {
        this.beforeCloseHandlers.add(handler);
    }

    onAfterClose(handler: AfterCloseHandler): void {
        this.afterCloseHandlers.add(handler);
    }

    async requestClose(): Promise<void> {
        let cancelled = false;
        const ctx: BeforeCloseContext = {
            cancel: () => {
                cancelled = true;
            },
            get canceled() {
                return cancelled;
            },
        };

        for (const handler of this.beforeCloseHandlers) {
            if (ctx.canceled) {
                return;
            }
            try {
                await Promise.resolve(handler(ctx));
            } catch (err) {
                console.error('Error en beforeClose handler:', err);
                return;
            }
        }

        if (!ctx.canceled) {
            this.confirmClose();
        }
    }

    private confirmClose(): void {
        for (const fn of this.afterCloseHandlers) {
            try {
                fn();
            } catch (err) {
                console.error('Error en afterClose handler:', err);
            }
        }
    }

    setCurrentComponent(component: PageComponent): void {
        this.currentComponent = component;
    }

    clearBeforeClose(): void {
        this.beforeCloseHandlers.clear();
    }
    clearAfterClose(): void {
        this.afterCloseHandlers.clear();
    }
    removeBeforeClose(fn: BeforeCloseHandler): void {
        this.beforeCloseHandlers.delete(fn);
    }
    removeAfterClose(fn: AfterCloseHandler): void {
        this.afterCloseHandlers.delete(fn);
    }
}
