import { GameState } from "@/types/pokemon-state";
import { Injectable } from "../decorators/injectable";

@Injectable()
export class GameStateManager {
  private state: GameState;

  private constructor() {
    this.state = this.initialState();
  }

  private initialState(): GameState {
    return {
      player: {
        position: { x: 500, y: 500 }
      }
    };
  }

  public getState(): Readonly<GameState> {
    return Object.freeze(structuredClone(this.state));
  }

  public updateState(updater: (state: GameState) => GameState): void {
    this.state = updater(structuredClone(this.state));
    this.saveToPersistentStorage();
    this.notifyObservers();
  }

  private saveToPersistentStorage(): void {
    localStorage.setItem("gameState", JSON.stringify(this.state));
  }

  public loadFromPersistentStorage(): void {
    const saved = localStorage.getItem("gameState");
    if (saved) this.state = JSON.parse(saved);
  }

  private observers: Function[] = [];

  public subscribe(observer: Function): void {
    this.observers.push(observer);
  }

  private notifyObservers(): void {
    this.observers.forEach((observer) => observer(this.getState()));
  }
}
