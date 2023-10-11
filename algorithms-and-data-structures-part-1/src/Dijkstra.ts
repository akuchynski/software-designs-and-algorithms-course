import { Vertex } from "./Vertex";
import { Graph } from "./WeightedGraph";
import { IDijkstra, IPath } from "./interfaces";

export class Dijkstra implements IDijkstra<Vertex> {
  private graph: Graph;

  constructor(graph: Graph) {
    this.graph = graph;
  }

  private getShortestDistanceNode = (distances: {}, visited: string[]) => {
    let shortest: string = null;

    for (let node in distances) {
      let isShortest = shortest === null || distances[node] < distances[shortest];

      if (isShortest && !visited.includes(node)) {
        shortest = node;
      }
    }

    return shortest;
  };

  public findShortestPath(vertex1: Vertex, vertex2: Vertex) {
    const start = vertex1.key;
    const end = vertex2.key;

    let visited: string[] = [];
    let distance = Infinity;
    let distances = {};

    distances[end] = distance;
    distances = Object.assign(distances, this.graph.adjacencyList[start]);

    if (start === end) {
      return { path: [end], distance: 0 };
    }

    let parents = { endNode: null };
    for (let child in this.graph.adjacencyList[start]) {
      parents[child] = start;
    }

    let node = this.getShortestDistanceNode(distances, visited);

    while (node) {
      let nodeDistance = distances[node];
      let children = this.graph.adjacencyList[node];

      if (nodeDistance === Infinity && Object.keys(children).length === 0) {
        distance = Infinity;
      }

      for (let child in children) {
        if (child !== start) {
          let newDistance = nodeDistance + children[child];

          if (!distances[child] || distances[child] > newDistance) {
            distances[child] = newDistance;
            parents[child] = node;
            distance = newDistance;
          }
        }
      }
      visited.push(node);
      node = this.getShortestDistanceNode(distances, visited);
    }

    let shortestPath: string[];

    if (distance === Infinity) {
      return { path: [], distance: Infinity };
    } else {
      shortestPath = [end];
    }

    let parent = parents[end];
    while (parent) {
      shortestPath.push(parent);
      parent = parents[parent];
    }

    shortestPath.reverse();

    return { path: shortestPath, distance: distances[end] };
  }

  public findAllShortestPaths(vertex: Vertex): Record<string, IPath> {
    const paths = {};
    for (let adjacencyKey in this.graph.adjacencyList) {
      if (vertex.key !== adjacencyKey) {
        paths[adjacencyKey] = this.findShortestPath(vertex, new Vertex(adjacencyKey)) as IPath;
      }
    }
    return paths;
  }
}