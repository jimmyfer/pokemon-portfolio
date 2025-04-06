export interface ServiceToken<T> {
  name: string;
}

export type ServiceKey<T> = new (...args: unknown[]) => T;
export type ServiceIdentifier<T> = ServiceKey<T> | ServiceToken<T>;

export class GameContext {

  private static instance: GameContext = new GameContext();

  private services: Map<ServiceIdentifier<unknown>, unknown> = new Map();

  private gameScale = 1;

  private tilesScale = 2;

  private tileSize = 32;

  private constructor() {}

  static getInstance(): GameContext {
    return GameContext.instance;
  }

  registerBean<T>(identifier: ServiceIdentifier<T>, instance: T): void {
    this.services.set(identifier, instance);
  }

  getBean<T>(identifier: ServiceIdentifier<T>): T {
    const instance = this.services.get(identifier);
    if (!instance) {
      const name = typeof identifier === 'function' ? identifier.name : identifier.name;
      throw new Error(`Service ${name} not registered`);
    }
    return instance as T;
  }

  setGameScale(scale: number) {
    this.gameScale = scale;
  }

  getGameScale(): number {
    return this.gameScale;
  }

  getTilesScale(): number {
    return this.tilesScale;
  }

  getTileSize(): number {
    return this.tileSize;
  }
}
