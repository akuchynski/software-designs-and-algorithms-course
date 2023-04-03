import { main, SortBy } from "./src/main";
import { flowAsync } from "./src/fp/utils";

main(SortBy.distance)
  .then(console.log)
  .then(() => console.log('\n///\n'))
  .then(() => main(SortBy.reward))
  .then(console.log)

const timeoutFn = (timeout: number) => new Promise((resolve) => setTimeout(() => resolve(timeout/2), timeout/2));

const flow = flowAsync(
  timeoutFn,
  timeoutFn,
  timeoutFn,
);

flow(4000).then(() => console.log('all async operations completed'));
