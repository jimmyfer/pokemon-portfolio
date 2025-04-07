export interface Trigger {
    update(deltaTime: number, ...args: any): void;
    action?: TriggerAction;
    render(): void;
}

export interface TriggerCondition {
    isMet(...args: unknown[]): boolean;
}

export interface TriggerAction {
    render(): void;
    execute(deltaTime: number): void;
}
