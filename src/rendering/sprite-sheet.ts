import { AnimationConfig, SpriteFrame, SpriteTile } from '@/types/sprite-sheet';

export class SpriteSheet {
    private image: HTMLImageElement;
    private tileWidth: number;
    private tileHeight: number;
    private tiles: SpriteTile[] = [];
    private animations: Map<string, AnimationConfig> = new Map();

    constructor(
        image: HTMLImageElement,
        tileWidth: number,
        tileHeight: number,
        padding: number = 0
    ) {
        this.image = image;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.generateFrames(padding);
    }

    private generateFrames(padding: number): void {
        const cols = Math.floor(this.image.width / (this.tileWidth + padding));
        const rows = Math.floor(
            this.image.height / (this.tileHeight + padding)
        );

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                this.tiles.push({
                    x: x * (this.tileWidth + padding),
                    y: y * (this.tileHeight + padding),
                });
            }
        }
    }

    defineAnimation(config: AnimationConfig): void {
        this.animations.set(config.name, {
            ...config,
            loop: config.loop ?? true,
        });
    }

    getImage(): HTMLImageElement {
        return this.image;
    }

    getAnimation(name: string): AnimationConfig {
        const animation = this.animations.get(name);
        if (!animation) {
            throw new Error(`Animation '${name}' not found`);
        }
        return animation;
    }

    getTile(frameIndex: number): SpriteTile {
        if (frameIndex < 0 || frameIndex >= this.tiles.length) {
            throw new Error(`Invalid frame index: ${frameIndex}`);
        }
        return this.tiles[frameIndex];
    }

    draw(
        ctx: CanvasRenderingContext2D,
        tile: SpriteTile,
        x: number,
        y: number,
        flipX: boolean = false,
        scale: number = 1
    ): void {
        ctx.save();
        if (flipX) {
            ctx.scale(-1, 1);
            x = -x - this.tileWidth * scale;
        }

        ctx.drawImage(
            this.image,
            tile.x,
            tile.y,
            this.width,
            this.height,
            x,
            y,
            this.tileWidth * scale,
            this.tileHeight * scale
        );

        ctx.restore();
    }

    get width(): number {
        return this.tileWidth;
    }

    get height(): number {
        return this.tileHeight;
    }
}

export class AnimatedSprite {
    private currentAnimation?: AnimationConfig;
    private currentFrameIndex: number = 0;
    private accumulator: number = 0;
    public isPlaying: boolean = false;
    private animationElapsedTime = 0;

    constructor(public spriteSheet: SpriteSheet) {}

    play(animationName: string, reset: boolean = true): void {
        if (reset || this.currentAnimation?.name !== animationName) {
            this.currentAnimation =
                this.spriteSheet.getAnimation(animationName);
            this.currentFrameIndex = 0;
            this.accumulator = 0;
            this.isPlaying = true;
        }
    }

    stop(): void {
        this.isPlaying = false;
    }

    update(deltaTime: number): void {
        if (!this.isPlaying || !this.currentAnimation) return;

        this.accumulator += deltaTime;
        const frameDuration = 1000 / this.currentAnimation.frameRate;

        while (this.accumulator >= frameDuration) {
            this.accumulator -= frameDuration;
            this.nextFrame();
        }
    }

    private nextFrame(): void {
        if (!this.currentAnimation) return;

        this.currentFrameIndex++;
        if (this.currentFrameIndex >= this.currentAnimation.frames.length) {
            if (this.currentAnimation.loop) {
                this.currentFrameIndex = 0;
            } else {
                this.currentFrameIndex =
                    this.currentAnimation.frames.length - 1;
                this.isPlaying = false;
            }
        }
    }

    getCurrentFrame(): SpriteFrame {
        if (!this.currentAnimation) {
            return {
                tiles: [],
                width: 0,
                height: 0,
                currentFrame: 0,
                currentAnimation: '',
            };
        }

        const currentTileIndices =
            this.currentAnimation.frames[this.currentFrameIndex];
        const tileWidth = this.spriteSheet.width;
        const tileHeight = this.spriteSheet.height;

        const tiles = currentTileIndices.map((row) =>
            row.map((index) => this.spriteSheet.getTile(index))
        );

        return {
            tiles,
            width: tiles[0]?.length * tileWidth || 0,
            height: tiles.length * tileHeight,
            currentFrame: this.currentFrameIndex,
            currentAnimation: this.currentAnimation.name,
        };
    }

    playSequence(
        deltaTime: number,
        duration: number,
        animations: string[],
        quantity: number
    ) {
        const totalDuration = duration * quantity;
        this.animationElapsedTime += deltaTime;

        if (this.animationElapsedTime / 1000 >= totalDuration) {
            return;
        }

        const elapsedSeconds = this.animationElapsedTime / 1000;
        const roundElapsedTime = elapsedSeconds % duration;

        const currentAnimationIndex = Math.floor(
            (roundElapsedTime / duration) * animations.length
        );
        const currentAnimation = animations[currentAnimationIndex];
        this.play(currentAnimation);
    }
}
