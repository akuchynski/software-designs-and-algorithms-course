import { AirEastShipper } from "./AirEastShipper";
import { ChicagoSprintShipper } from "./ChicagoSprintShipper";
import { PacificParcelShipper } from "./PacificParcelShipper";

export class ShipperFactory {
  private static PACIFIC_REGEXP = /^[7-9]/;
  private static CHICAGO_REGEXP = /^[4-6]/;

  public static getShipperStrategy(zipCode: string) {
    if (ShipperFactory.PACIFIC_REGEXP.test(zipCode)) {
      return new PacificParcelShipper();
    }

    if (ShipperFactory.CHICAGO_REGEXP.test(zipCode)) {
      return new ChicagoSprintShipper();
    }

    return new AirEastShipper();
  }
}
