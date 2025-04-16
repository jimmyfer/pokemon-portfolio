import { Injectable } from '@/core/decorators/injectable';
import { SpriteSheet } from '@/rendering/sprite-sheet';
import { ImageCache } from './image-cache';

@Injectable()
export class AssetManager {
    private spriteSheets = new Map<string, SpriteSheet>();
    private jsonData = new Map<string, any>();

    constructor() {}

    async loadJson<T>(name: string, url: string): Promise<T> {
        if (this.jsonData.has(name)) {
            return this.jsonData.get(name);
        }

        try {
            const response = await fetch(url);
            const data: T = await response.json();
            this.jsonData.set(name, data);
            return data;
        } catch (error) {
            throw new Error(`Failed to load JSON ${name}: ${error}`);
        }
    }

    async loadImage(name: string, url: string): Promise<HTMLImageElement> {
        try {
            const img = await ImageCache.load(url);
            return img;
        } catch (error) {
            throw new Error(`Failed to load image ${name}: ${error}`);
        }
    }

    getSpriteSheet(name: string): SpriteSheet {
        if (!this.spriteSheets.has(name)) {
            throw new Error(`SpriteSheet '${name}' not loaded`);
        }
        return this.spriteSheets.get(name)!;
    }

    async loadSpriteSheet(
        name: string,
        url: string,
        frameWidth: number,
        frameHeight: number,
        padding: number = 0
    ): Promise<SpriteSheet> {
        if (this.spriteSheets.has(name)) {
            return this.spriteSheets.get(name)!;
        }

        const img = await this.loadImage(name, url);
        const spriteSheet = new SpriteSheet(
            img,
            frameWidth,
            frameHeight,
            padding
        );
        this.spriteSheets.set(name, spriteSheet);
        return spriteSheet;
    }

    getJson<T>(name: string): T {
        if (!this.jsonData.has(name)) {
            throw new Error(`JSON data '${name}' not loaded`);
        }
        return this.jsonData.get(name) as T;
    }
}
