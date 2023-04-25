import { Dijkstra } from "./src/Dijkstra";
import { Edge } from "./src/Edge";
import { Vertex } from "./src/Vertex";
import { Graph } from "./src/WeightedGraph";

const vertices = [
  new Vertex("1"),
  new Vertex("2"),
  new Vertex("3"),
  new Vertex("4"),
  new Vertex("5")
];

const vertex1 = vertices[0];
const vertex2 = vertices[1];
const vertex3 = vertices[2];
const vertex4 = vertices[3];
const vertex5 = vertices[4];

const edges = [
  new Edge(vertex1, vertex4, 3),
  new Edge(vertex1, vertex2, 5),
  new Edge(vertex1, vertex3, 4),
  new Edge(vertex2, vertex4, 6),
  new Edge(vertex2, vertex3, 5)
];
const graph: Graph = new Graph();

vertices.forEach(vertex => graph.addVertex(vertex.key));
edges.forEach(edge => graph.addEdge(edge.from, edge.to, edge.weight));

const dijkstra: Dijkstra = new Dijkstra(graph);

console.log(graph.adjacencyList);
console.log(dijkstra.findShortestPath(vertex4, vertex3));
console.log(dijkstra.findShortestPath(vertex1, vertex5));
console.log(dijkstra.findShortestPath(vertex1, vertex1));
console.log(dijkstra.findAllShortestPaths(vertex4));