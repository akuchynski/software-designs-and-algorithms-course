import { Consumable } from "./Consumable";

export class Pizza extends Consumable {
  public readonly numberOfSlices: number;
  private numberOfEatenSlices: number = 0;

  constructor(value: number, weight: number, numberOfSlices: number, isSpoiled?: boolean) {
    super("pizza", value, weight, isSpoiled);
    this.numberOfSlices = numberOfSlices;
  }

  getNumberOfEatenSlices() {
    return this.numberOfEatenSlices;
  }

  public use(): string {
    if (this.numberOfEatenSlices >= this.numberOfSlices) {
      this.isConsumed = true;
      return super.use();
    }
    this.numberOfEatenSlices++;
    return `You consumed a slice of the ${this.name}.`;
  }
}
