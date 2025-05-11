import { TransitionEffect } from '@/types/transition-effects';
import { Injectable } from '../decorators/injectable';

@Injectable()
export class OpacityTransitionEffect implements TransitionEffect {
    private opacity: number = 0;

    initialize() {
        this.opacity = 0;
    }

    update(progress: number) {
        this.opacity = progress;
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.restore();
    }
}
