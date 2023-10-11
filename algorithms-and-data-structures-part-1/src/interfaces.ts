export interface IWeightedGraph<T> {
  addVertex(key: string): void;
  addEdge(vertex1: T, vertex2: T, weight: number): void;
}

export interface IPath {
  path: string[];
  distance: number;
}

export interface IDijkstra<T> {
  findShortestPath(vertex1: T, vertex2: T): IPath;
  findAllShortestPaths(vertex: T): Record<string, IPath>;
}