import { eventListeners, shipmentCallback, ShipmentState } from "./types";

export interface GUI {
  on: (eventType: string, callback: shipmentCallback) => void;
  trigger: (eventType: string, state: ShipmentState) => void;
}

export class MockGUI implements GUI {
  private eventListeners: eventListeners = {};

  public on(eventType: string, callback: shipmentCallback) {
    if (this.eventListeners[eventType]) {
      this.eventListeners[eventType].push(callback);
    } else {
      this.eventListeners[eventType] = [callback];
    }
  }

  public trigger(eventType: string, state: ShipmentState) {
    this.eventListeners[eventType].forEach((callback) => callback(state));
  }
}
