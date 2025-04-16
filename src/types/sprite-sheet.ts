export type AnimationConfig = {
    name: string;
    frames: number[][][];
    frameRate: number;
    loop?: boolean;
    flipX?: boolean;
    flipY?: boolean;
};

export type SpriteTile = {
    x: number;
    y: number;
};

export type SpriteFrame = {
    tiles: SpriteTile[][];
    width: number;
    height: number;
};

export type AnimationSequence = {
    speed: number;
    frames: number[];
};

export interface Vector2D {
    x: number;
    y: number;
}

export interface Sprite {
    image: HTMLImageElement;
    frame: Vector2D;
    width: number;
    height: number;
}
