import { Shape } from "./Shape";
import { Point } from "./Point";

enum TriangleTypes {
  EQUILATERAL = "equilateral triangle",
  ISOSCELES = "isosceles triangle",
  SCALENE = "scalene triangle",
}

type TriangleType = TriangleTypes.EQUILATERAL | TriangleTypes.ISOSCELES | TriangleTypes.SCALENE;

export class Triangle extends Shape {
  constructor(firstPoint: Point, secondPoint: Point, thirdPoint: Point);
  constructor(firstPoint: Point, secondPoint: Point, thirdPoint: Point, color: string, filled: boolean);
  constructor(
    firstPoint: Point,
    secondPoint: Point,
    thirdPoint: Point,
    color: string = "green",
    filled: boolean = true
  ) {
    const pointsAsArr = [firstPoint, secondPoint, thirdPoint];

    super(pointsAsArr, color, filled);
  }

  public toString(): string {
    const result = this.points.map((point, index) => `v${index + 1}=${point.toString()}`).join();
    return `Triangle[${result}]`;
  }

  private getTriangleSides(): number[] {
    return this.points.map((point, index, arr) => {
      let distance: number;

      if (index === arr.length - 1) {
        distance = point.distance(arr[0]);
      } else {
        distance = point.distance(arr[index + 1]);
      }

      return Number(distance.toFixed(2));
    });
  }

  private static getUniqValuesQuantity(arr): number {
    return new Set(arr).size;
  }

  private static checkTriangleType(uniqueSidesQnt): TriangleType {
    if (uniqueSidesQnt === 1) {
      return TriangleTypes.EQUILATERAL;
    }
    if (uniqueSidesQnt === 2) {
      return TriangleTypes.ISOSCELES;
    }

    return TriangleTypes.SCALENE;
  }

  public getType(): string {
    const sides = this.getTriangleSides();
    const uniqueSidesQnt = Triangle.getUniqValuesQuantity(sides);

    return Triangle.checkTriangleType(uniqueSidesQnt);
  }
}
