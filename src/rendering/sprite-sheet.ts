import { AnimationConfig, SpriteFrame } from "@/types/sprite-sheet";

export class SpriteSheet {
  private image: HTMLImageElement;
  private frameWidth: number;
  private frameHeight: number;
  private frames: SpriteFrame[] = [];
  private animations: Map<string, AnimationConfig> = new Map();

  constructor(
    image: HTMLImageElement,
    frameWidth: number,
    frameHeight: number,
    padding: number = 0
  ) {
    this.image = image;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.generateFrames(padding);
  }

  private generateFrames(padding: number): void {
    const cols = Math.floor(this.image.width / (this.frameWidth + padding));
    const rows = Math.floor(this.image.height / (this.frameHeight + padding));

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        this.frames.push({
          x: x * (this.frameWidth + padding),
          y: y * (this.frameHeight + padding),
          width: this.frameWidth,
          height: this.frameHeight,
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

  getFrame(frameIndex: number): SpriteFrame {
    if (frameIndex < 0 || frameIndex >= this.frames.length) {
      throw new Error(`Invalid frame index: ${frameIndex}`);
    }
    return this.frames[frameIndex];
  }

  getAnimation(name: string): AnimationConfig {
    const animation = this.animations.get(name);
    if (!animation) {
      throw new Error(`Animation '${name}' not found`);
    }
    return animation;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    frame: SpriteFrame,
    x: number,
    y: number,
    flipX: boolean = false,
    scale: number = 1
  ): void {
    ctx.save();
    if (flipX) {
      ctx.scale(-1, 1);
      x = -x - this.frameWidth * scale;
    }

    ctx.drawImage(
      this.image,
      frame.x,
      frame.y,
      frame.width,
      frame.height,
      x,
      y,
      this.frameWidth * scale,
      this.frameHeight * scale
    );

    ctx.restore();
  }

  get width(): number {
    return this.frameWidth;
  }

  get height(): number {
    return this.frameHeight;
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
      this.currentAnimation = this.spriteSheet.getAnimation(animationName);
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
        this.currentFrameIndex = this.currentAnimation.frames.length - 1;
        this.isPlaying = false;
      }
    }
  }

  getCurrentFrame(): SpriteFrame {
    if (!this.currentAnimation) {
      return this.spriteSheet.getFrame(0);
    }
    const actualFrame = this.currentAnimation.frames[this.currentFrameIndex];
    return this.spriteSheet.getFrame(actualFrame);
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

    const currentAnimationIndex = Math.floor((roundElapsedTime / duration) * animations.length);
    const currentAnimation = animations[currentAnimationIndex];
    this.play(currentAnimation);
  }
}
