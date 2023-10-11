import { ShipmentDecorator } from "../decorators/ShipmentDecorator";
import { ShipmentState, ShipmentType } from "../types";
import { Shipment } from "./Shipment";

@ShipmentDecorator
export class Letter extends Shipment {
  constructor(state: ShipmentState) {
    super(state);
  }

  public getCost() {
    return this.shipmentStrategy.getCost(this.getWeight(), ShipmentType.LETTER);
  }
}
