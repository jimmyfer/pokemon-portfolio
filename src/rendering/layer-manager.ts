import { Injectable } from '@/core/decorators/injectable';
import { Layer, LayerPriority } from '../types/render-types';

@Injectable()
export class LayerManager {
    private layers: Map<LayerPriority, Layer> = new Map();
    private sortedLayers: Layer[] = [];

    addLayer(layer: Layer): void {
        this.layers.set(layer.priority, layer);
        this.sortLayers();
    }

    removeLayer(layerPriority: LayerPriority): void {
        this.layers.delete(layerPriority);
        this.sortLayers();
    }

    getLayer(layerPriority: LayerPriority): Layer | undefined {
        return this.layers.get(layerPriority);
    }

    private sortLayers(): void {
        this.sortedLayers = Array.from(this.layers.values())
            .filter((layer) => layer.enabled)
            .sort((a, b) => a.priority - b.priority);
    }

    update(deltaTime: number): void {
        this.sortedLayers.forEach((layer) => {
            if (layer.update) {
                layer.update(deltaTime);
            }
        });
    }

    render(): void {
        this.sortedLayers.forEach((layer) => layer.render());
    }
}
