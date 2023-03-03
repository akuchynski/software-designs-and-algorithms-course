import { Comparable } from "./Comparable";

let idCounter = 0;

export abstract class Item implements Comparable<Item> {
  private readonly id: number;
  public readonly name: string;
  public value: number;
  public weight: number;

  constructor(name: string, value: number, weight: number) {
    this.id = ++idCounter;
    this.name = name;
    this.value = value;
    this.weight = weight;
  }

  public abstract use();

  public getId(): number {
    return this.id;
  }

  public compareTo(other: Item): number {
    if (this.value > other.value) {
      return 1;
    } else if (this.value < other.value) {
      return -1;
    } else {
      return this.name.localeCompare(other.name);
    }
  }

  public toString(): string {
    return `${this.name} − Value: ${this.value.toFixed(2)}, Weight: ${this.weight.toFixed(2)}`;
  }

  public static resetIdCounter(): void {
    idCounter = 0;
  }
}
