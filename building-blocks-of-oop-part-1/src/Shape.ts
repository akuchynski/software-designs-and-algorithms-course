import { Point } from "./Point";

export abstract class Shape {
  protected readonly color: string;
  protected readonly filled: boolean;
  protected readonly points: Point[];

  abstract getType(): string;

  constructor(points: Point[]);
  constructor(points: Point[], color: string, filled: boolean);
  constructor(points: Point[], color: string = "green", filled: boolean = true) {
    if (!points || points.length < 3) {
      throw Error("Should receives at least 3 points");
    }

    this.points = points;
    this.color = color;
    this.filled = filled;
  }

  public toString(): string {
    const filledStatus = this.filled ? "filled" : "not filled";
    const pointStrings = this.points.map((point) => point.toString()).join(", ");

    return `A Shape with color of ${this.color} and ${filledStatus}. Points: ${pointStrings}.`;
  }

  public getPerimeter(): number {
    let perimeter: number = 0;

    this.points.forEach((point, index, self) => {
      if (index === self.length - 1) {
        return (perimeter += point.distance(self[0]));
      }

      return (perimeter += point.distance(self[index + 1]));
    });

    return perimeter;
  }
}
