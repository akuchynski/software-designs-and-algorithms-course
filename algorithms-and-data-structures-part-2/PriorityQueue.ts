export class PriorityQueue<T> {
  public values: Array<T>;
  public length: number;

  constructor() {
    this.values = [];
    this.length = 0;
  }

  public enqueue(value: T): void {
    this.length++;
    this.values.push(value);

    this.bubbleUp();
  }

  public dequeue(): T | null {
    if (this.length === 0) return null;

    const node = this.values[0];

    if (this.length === 1) {
      this.length = 0;
      this.values.pop();

      return node;
    }

    this.values[0] = this.values[this.length - 1];
    this.values.pop();
    this.length--;

    this.bubbleDown();

    return node;

  }

  private bubbleUp(): void {
    let idx = this.length - 1;

    while (true) {
      const parentIdx = PriorityQueue.getParent(idx);

      if (parentIdx !== null && this.values[idx] < this.values[parentIdx]) {
        const tmp = this.values[idx];
        this.values[idx] = this.values[parentIdx];
        this.values[parentIdx] = tmp;
        idx = parentIdx;
        continue;
      }

      return;
    }
  }

  private static getParent(idx: number): number | null {
    return idx > 0 ? Math.floor((idx - 1) / 2) : null;
  }

  private bubbleDown() {
    let idx = 0;

    while (true) {
      const leftChildIdx = this.getLeftChild(idx);
      const rightChildIdx = this.getRightChild(idx);

      let swapCandidate = idx;

      if (leftChildIdx !== null && this.values[swapCandidate] > this.values[leftChildIdx]) {
        swapCandidate = leftChildIdx;
      }

      if (rightChildIdx !== null && this.values[swapCandidate] > this.values[rightChildIdx]) {
        swapCandidate = rightChildIdx;
      }

      if (swapCandidate !== idx) {
        const tmp = this.values[idx];
        this.values[idx] = this.values[swapCandidate];
        this.values[swapCandidate] = tmp;
        idx = swapCandidate;
        continue;
      }

      return;
    }
  }

  private getLeftChild(idx: number): number | null {
    const child = idx * 2 + 1;
    if (child >= this.length) return null;
    return child;
  }

  private getRightChild(idx: number): number | null {
    const child = idx * 2 + 2;
    if (child >= this.length) return null;
    return child;
  }

  public heapSort(): Array<T | null> {
    return Array.from({ length: this.length }, () => this.dequeue());
  }
}