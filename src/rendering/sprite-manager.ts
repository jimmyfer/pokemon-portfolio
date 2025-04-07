import { AnimationSequence } from '@/types/sprite-sheet';

export class AnimatedSprite {
    private currentAnimation: string = 'idle';
    private frameIndex: number = 0;
    private timer: number = 0;

    constructor(private animations: Record<string, AnimationSequence>) {}

    update(deltaTime: number) {
        const animation = this.animations[this.currentAnimation];
        this.timer += deltaTime;

        if (this.timer >= animation.speed) {
            this.frameIndex = (this.frameIndex + 1) % animation.frames.length;
            this.timer = 0;
        }
    }
}
