import { Input } from "@/input/input-manager";
import { TriggerCondition } from "@/types/trigger";

export class KeyPressTrigger implements TriggerCondition {
    private pressed: boolean;
    constructor(private key: string) {}
  
    isMet(): boolean {
      if(Input.isKeyDown(this.key)) this.pressed = true;
      return this.pressed;
    }
  }