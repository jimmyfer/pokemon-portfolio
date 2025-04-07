import { Injectable } from '@/core/decorators/injectable';
import { SpriteSheet } from '@/rendering/sprite-sheet';

@Injectable()
export class AssetManager {
    private textures = new Map<string, HTMLImageElement>();
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
        if (this.textures.has(name)) {
            return this.textures.get(name)!;
        }

        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                this.textures.set(name, img);
                resolve(img);
            };
            img.onerror = reject;
        });
    }

    getTexture(name: string): HTMLImageElement {
        if (!this.textures.has(name)) {
            throw new Error(`Texture '${name}' not loaded`);
        }
        return this.textures.get(name)!;
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

    getSpriteSheet(name: string): SpriteSheet {
        if (!this.spriteSheets.has(name)) {
            throw new Error(`SpriteSheet '${name}' not loaded`);
        }
        return this.spriteSheets.get(name)!;
    }

    getJson<T>(name: string): T {
        if (!this.jsonData.has(name)) {
            throw new Error(`JSON data '${name}' not loaded`);
        }
        return this.jsonData.get(name) as T;
    }
}
