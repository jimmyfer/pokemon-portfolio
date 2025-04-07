export interface TriggerCondition {
    isMet(...args: unknown[]): boolean;
}

export interface TriggerAction {
    render(): void;
    execute(deltaTime: number): void;
}
