export class ImageCache {
    private static cache: Map<string, HTMLImageElement> = new Map();

    public static load(url: string): Promise<HTMLImageElement> {
        if (this.cache.has(url)) {
            return Promise.resolve(this.cache.get(url)!);
        }

        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                this.cache.set(url, img);
                resolve(img);
            };
            img.onerror = (error) =>
                reject(`Error loading image at ${url}: ${error}`);
        });
    }

    public static get(url: string): HTMLImageElement | undefined {
        return this.cache.get(url);
    }
}
