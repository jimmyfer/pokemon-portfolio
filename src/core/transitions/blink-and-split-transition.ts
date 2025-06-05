import { TransitionEffect } from '@/types/transition-effects';
import { Injectable } from '../decorators/injectable';

@Injectable()
export class BlinkSplitTransitionEffect implements TransitionEffect {
    private opacity: number = 0;
    private splitProgress: number = 0;
    private previousProgress: number = 0;
    private closingPhase: boolean = true;

    initialize() {
        this.opacity = 0;
        this.splitProgress = 0;
        this.previousProgress = 0;
        this.closingPhase = true;
    }

    update(progress: number) {
        this.closingPhase = progress > this.previousProgress;
        this.previousProgress = progress;

        if (this.closingPhase) {
            const numberOfBlinks = 3;
            const blinkProgress = progress * numberOfBlinks;

            if (blinkProgress < 2) {
                this.opacity = Math.abs(Math.sin(blinkProgress * Math.PI));
            } else {
                this.opacity = Math.min(1, (blinkProgress - 2) * 2);
            }
        } else {
            this.splitProgress = 1 - progress;
            this.opacity = 1;
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.save();

        if (this.closingPhase) {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        } else {
            ctx.fillStyle = 'black';
            const separation = this.splitProgress * ctx.canvas.height;

            ctx.save();
            ctx.translate(0, -separation);
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height / 2);
            ctx.restore();

            ctx.save();
            ctx.translate(0, separation);
            ctx.fillRect(
                0,
                ctx.canvas.height / 2,
                ctx.canvas.width,
                ctx.canvas.height / 2
            );
            ctx.restore();
        }

        ctx.restore();
    }
}
