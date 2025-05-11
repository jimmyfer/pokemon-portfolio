export interface TransitionEffect {
    initialize(): void;
    update(progress: number): void;
    render(ctx: CanvasRenderingContext2D): void;
}
