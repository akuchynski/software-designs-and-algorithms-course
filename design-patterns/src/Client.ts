import { GUI } from "./mockGui";
import { Letter } from "./Shipments/Letter";
import { Oversized } from "./Shipments/Oversized";
import { Package } from "./Shipments/Package";
import { ShipmentState } from "./types";

export class Client {
  constructor(private gui: GUI) {
    this.gui.on("ship", (state: ShipmentState) => this.onShip(state));
  }

  public onShip(state: ShipmentState) {
    const shipmentInstance = Client.getShipmentInstance(state);
    return shipmentInstance.ship();
  }

  private static getShipmentInstance(state: ShipmentState) {
    if (state.weight <= 15) {
      return new Letter(state);
    }

    if (state.weight > 160) {
      return new Oversized(state);
    }

    return new Package(state);
  }
}
