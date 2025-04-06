import { Vector2D } from "@/types/sprite-sheet";

export class Input {
    private static keys: Map<string, boolean> = new Map();
    private static directionOrder: string[] = [];

    static initialize() {
        window.addEventListener("keydown", (e) => {
            this.keys.set(e.key, true);
            if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)) {
                if (!this.directionOrder.includes(e.key)) {
                    this.directionOrder.push(e.key);
                }
            }
        });
        window.addEventListener("keyup", (e) => {
            this.keys.set(e.key, false);
            if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)) {
                this.directionOrder = this.directionOrder.filter(key => key !== e.key);
            }
        });
    }

    static isKeyDown(key: string): boolean {
        return this.keys.get(key) || false;
    }

    static get movementDirection(): Vector2D {

        if (this.directionOrder.length === 0) {
            return { x: 0, y: 0 };
        }

        const firstKey = this.directionOrder[0];
        switch (firstKey) {
            case "ArrowRight":
                return { x: 1, y: 0 };
            case "ArrowLeft":
                return { x: -1, y: 0 };
            case "ArrowDown":
                return { x: 0, y: 1 };
            case "ArrowUp":
                return { x: 0, y: -1 };
            default:
                return { x: 0, y: 0 };
        }
    }
}
