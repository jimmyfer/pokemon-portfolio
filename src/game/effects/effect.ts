import { AssetManager } from "@/assets/assetsManager";
import { GameContext } from "@/core/engine/game-context";
import { Vector2D } from "@/types/sprite-sheet";

type EffectSecuence = {
  duraction: number;
  animations: string[];
  quantity: number;
};

export abstract class Effect<T extends string> {
  public position: Vector2D;
  protected assetManager: AssetManager;
  protected animationSecuences: Map<string, EffectSecuence> = new Map();

  constructor(x: number, y: number) {
    this.position = { x, y };
    this.assetManager = GameContext.getInstance().getBean(AssetManager);
  }

  public abstract update(deltaTime: number): void;

  public abstract render(): void;

  public abstract playSequence(secuence: T, deltaTime: number): void;
}
