export class Point {
  private readonly x: number;
  private readonly y: number;

  constructor();
  constructor(x: number, y: number);
  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  public distance();
  public distance(otherPoint: Point);
  public distance(x, y);
  public distance(otherPointOrX: Point | number = 0, y: number = 0): number {
    const { x: x1, y: y1 } = this;

    if (otherPointOrX instanceof Point) {
      const { x: x2, y: y2 } = otherPointOrX;
      return Point.getDistanceByPythagoreanTheorem(x1, y1, x2, y2);
    }

    return Point.getDistanceByPythagoreanTheorem(x1, y1, otherPointOrX, y);
  }

  private static getDistanceByPythagoreanTheorem(x1: number, y1: number, x2: number, y2: number): number {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    return Math.sqrt(deltaX ** 2 + deltaY ** 2);
  }

  public toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}
