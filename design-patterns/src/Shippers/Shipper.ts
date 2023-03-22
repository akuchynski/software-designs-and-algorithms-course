import { ShipmentType } from "../types";

export abstract class Shipper {
  protected constructor(private letterCost: number, private packageCost: number) {}

  public getCost(weight: number, type: ShipmentType): number {
    return type === ShipmentType.LETTER ? this.getLetterCost(weight) : this.getPackageCost(weight);
  }

  private getLetterCost(weight: number) {
    return +(weight * this.letterCost).toFixed(2);
  }

  private getPackageCost(weight: number) {
    return +(weight * this.packageCost).toFixed(2);
  }
}
