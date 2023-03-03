import { Item } from "./Item";
import { ItemComparator } from "./ItemComparator";

export class Inventory {
  private items: Item[] = [];

  public sort();
  public sort(comparator: ItemComparator);
  public sort(comparator?: ItemComparator) {
    if (comparator) {
      return this.items.sort((a, b) => comparator.compare(a, b));
    } else {
      return this.items.sort((a, b) => a.value - b.value);
    }
  }

  public addItem(item: Item): void {
    this.items.push(item);
  }

  public toString(): string {
    return this.items.join(", ");
  }
}
