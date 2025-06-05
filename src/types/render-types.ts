export enum LayerPriority {
    BACKGROUND = 0,
    BACKGROUND_LOW = 10,
    BACKGROUND_MED = 20,
    BACKGROUND_HIGH = 30,
    TERRAIN = 100,
    ENTITIES_LOW = 200,
    ENTITIES_MED = 210,
    ENTITIES_HIGH = 230,
    FOREGROUND = 300,
    UI = 400,
    DEBUG = 500,
    WORLD_EFFECTS = 600,
}

export interface Layer {
    update?(deltaTime: number): void;
    render(): void;
    priority: LayerPriority;
    enabled: boolean;
}

export enum LayerGroup {
    COLLISION = 'collision',
    BUSH = 'bush',
}
