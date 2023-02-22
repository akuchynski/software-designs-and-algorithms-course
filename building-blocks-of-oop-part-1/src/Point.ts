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
    let x2: number;
    let y2: number;

    if (otherPointOrX instanceof Point) {
      x2 = otherPointOrX.x;
      y2 = otherPointOrX.y;
    } else {
      x2 = otherPointOrX;
      y2 = y;
    }

    return Math.sqrt(Math.pow(x2 - this.x, 2) + Math.pow(y2 - this.y, 2));
  }

  public toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}
