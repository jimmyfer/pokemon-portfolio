import { Injectable } from '../decorators/injectable';

type EventHandler<T = any> = (data: T) => void | Promise<void>;

@Injectable()
export class EventSystem {
    private handlers: Map<string, Set<EventHandler>> = new Map();
    private asyncHandlers: Map<string, Set<EventHandler>> = new Map();
    private contextCache: WeakMap<object, Set<string>> = new WeakMap();

    on<T = any>(
        eventType: string,
        handler: EventHandler<T>,
        context?: object
    ): void {
        this.registerHandler(eventType, handler, this.handlers, context);
    }

    onAsync<T = any>(
        eventType: string,
        handler: EventHandler<T>,
        context?: object
    ): void {
        this.registerHandler(eventType, handler, this.asyncHandlers, context);
    }

    private registerHandler<T>(
        eventType: string,
        handler: EventHandler<T>,
        collection: Map<string, Set<EventHandler>>,
        context?: object
    ): void {
        if (!collection.has(eventType)) {
            collection.set(eventType, new Set());
        }
        collection.get(eventType)!.add(handler);

        if (context) {
            if (!this.contextCache.has(context)) {
                this.contextCache.set(context, new Set());
            }
            this.contextCache.get(context)!.add(eventType);
        }
    }

    async emit<T = any>(eventType: string, data: T): Promise<void> {
        const syncResults = this.processHandlers(
            this.handlers,
            eventType,
            data
        );
        const asyncResults = this.processHandlers(
            this.asyncHandlers,
            eventType,
            data
        );

        await Promise.all([...syncResults, ...asyncResults]);
    }

    private *processHandlers<T>(
        collection: Map<string, Set<EventHandler>>,
        eventType: string,
        data: T
    ): Generator<Promise<void>> {
        const handlers = collection.get(eventType) || new Set();
        for (const handler of handlers) {
            try {
                const result = handler(data);
                if (result instanceof Promise) {
                    yield result.catch((error) =>
                        this.handleError(error, eventType)
                    );
                }
            } catch (error: any) {
                this.handleError(error, eventType);
            }
        }
    }

    offContext(context: object): void {
        const events = this.contextCache.get(context) || new Set();
        events.forEach((eventType) => {
            this.handlers.get(eventType)?.forEach((handler) => {
                if ((handler as any).context === context) {
                    this.handlers.get(eventType)?.delete(handler);
                }
            });
            this.asyncHandlers.get(eventType)?.forEach((handler) => {
                if ((handler as any).context === context) {
                    this.asyncHandlers.get(eventType)?.delete(handler);
                }
            });
        });
        this.contextCache.delete(context);
    }

    private handleError(error: Error, eventType: string): void {
        console.error(`Error in event handler for ${eventType}:`, error);
        this.emit('EVENT_ERROR', { error, eventType });
    }

    clear(): void {
        this.handlers.clear();
        this.asyncHandlers.clear();
        this.contextCache = new WeakMap();
    }
}
