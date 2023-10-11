import { Vertex } from "./Vertex";
import { IWeightedGraph } from "./interfaces";

export class Graph implements IWeightedGraph<Vertex> {
  adjacencyList: object;

  constructor() {
    this.adjacencyList = {};
  }

  addVertex(key: string): void {
    this.adjacencyList[key] = {};
  }

  addEdge(from: Vertex, to: Vertex, weight: number): void {
    this.adjacencyList[from.key][to.key] = weight;
    this.adjacencyList[to.key][from.key] = weight;
  }
}