import { ShipmentType } from "../types";
import { Shipper } from "./Shipper";

export class AirEastShipper extends Shipper {
  private static LETTER_COST = 0.39;
  private static PACKAGE_COST = 0.25;

  constructor() {
    super(AirEastShipper.LETTER_COST, AirEastShipper.PACKAGE_COST);
  }

  public getCost(weight: number, type: ShipmentType) {
    return type === ShipmentType.OVERSIZED
      ? super.getCost(weight, ShipmentType.PACKAGE) + 10
      : super.getCost(weight, type);
  }
}
