import { Injectable } from '@/core/decorators/injectable';
import { Layer } from '../types/render-types';

@Injectable()
export class LayerManager {
    private layers: Map<string, Layer> = new Map();
    private sortedLayers: Layer[] = [];

    addLayer(name: string, layer: Layer): void {
        this.layers.set(name, layer);
        this.sortLayers();
    }

    removeLayer(name: string): void {
        this.layers.delete(name);
        this.sortLayers();
    }

    getLayer(name: string): Layer | undefined {
        return this.layers.get(name);
    }

    private sortLayers(): void {
        this.sortedLayers = Array.from(this.layers.values())
            .filter((layer) => layer.enabled)
            .sort((a, b) => a.priority - b.priority);
    }

    update(deltaTime: number): void {
        this.sortedLayers.forEach((layer) => layer.update(deltaTime));
    }

    render(ctx: CanvasRenderingContext2D): void {
        this.sortedLayers.forEach((layer) => layer.render(ctx));
    }
}
