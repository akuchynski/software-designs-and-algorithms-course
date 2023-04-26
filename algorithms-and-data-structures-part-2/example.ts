import { PriorityQueue } from "./PriorityQueue";

const queue = new PriorityQueue();

const jobs = 10000;

for (let i = 0; i < jobs; i++) {
  const jobPriority = Math.trunc(Math.random() * jobs);
  queue.enqueue(jobPriority);
}

queue.heapSort().map((item) => console.log(item));