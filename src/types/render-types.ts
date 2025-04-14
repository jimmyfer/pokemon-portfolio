export enum LayerPriority {
    BACKGROUND = 0,
    BACKGROUND_LOW = 10,
    BACKGROUND_MED = 20,
    BACKGROUND_HIGH = 30,
    TERRAIN = 100,
    ENTITIES = 200,
    FOREGROUND = 300,
    UI = 400,
    DEBUG = 500,
}

export interface Layer {
    update(deltaTime: number): void;
    render(): void;
    priority: LayerPriority;
    enabled: boolean;
}
