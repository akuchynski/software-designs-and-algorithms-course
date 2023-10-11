import { IShipment, Marks } from "../types";

type Constructor<T = {}> = new (...args: any[]) => T;
type Shippable = Constructor<IShipment>;

export function ShipmentDecorator<T extends Shippable>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
    }

    public ship() {
      const result = super.ship();
      const marks: Marks[] | undefined = super.getMarks();

      if (marks?.length) {
        const preparedMarks = marks.map((mark) => `**MARK ${mark.toUpperCase()}**`).join("\n");
        return `${result}\n${preparedMarks}`;
      }

      return result;
    }
  };
}
