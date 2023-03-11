import { Either, fromPromise, ap, right, getOrElse, flatten, left } from "./fp/either";
import { pipe } from "./fp/utils";
import { fetchClient, fetchExecutor } from "./fetching";
import { ClientUser, Demand, ExecutorUser } from "./types";
import { fold, fromNullable } from "./fp/maybe";
import { distance } from "./utils";
import { fromCompare, ordNumber, revert } from "./fp/ord";

type Response<R> = Promise<Either<string, R>>

const getExecutor = (): Response<ExecutorUser> => fromPromise(fetchExecutor());
const getClients = (): Response<Array<ClientUser>> => fromPromise(fetchClient()
  .then(value => value.map(({ demands, ...restParams }) => ({
    demands: fromNullable(demands),
    ...restParams
  }))));

export enum SortBy {
  distance = "distance",
  reward = "reward",
}

export const show = (sortBy: SortBy) => (clients: Array<ClientUser>) => (executor: ExecutorUser): Either<string, string> => {
  const rewardPredicate = (item1: ClientUser, item2: ClientUser) => (
    ordNumber.compare(item1.reward, item2.reward)
  );

  const distancePredicate = (item1: ClientUser, item2: ClientUser) => (
    ordNumber.compare(distance(item1.position, executor.position), distance(item2.position, executor.position))
  );

  const rewardOrd = revert(fromCompare(rewardPredicate));
  const distanceOrd = fromCompare(distancePredicate);

  const compareClients = (a: ClientUser, b: ClientUser): number => {
    return sortBy === SortBy.reward ? rewardOrd.compare(a, b) : distanceOrd.compare(a, b);
  };

  const sortedClients = [...clients].sort(compareClients);

  const executorClients = sortedClients.filter(client => {
    const isMeetDemands = fold<Array<Demand>, boolean>(
      () => true,
      (clientDemands) => clientDemands.every(demand => executor.possibilities.includes(demand))
    );
    return isMeetDemands(client.demands);
  });

  const clientsCount = executorClients.length;
  const allClientsCount = sortedClients.length;

  let result = `This executor meets the demands of only ${clientsCount} out of ${allClientsCount} clients\n\n`;

  const tableHeader = sortBy === SortBy.reward ?
    "Available clients sorted by highest reward:\n" :
    "Available clients sorted by distance to executor:\n";
  const tableRows = executorClients.map(client => `name: ${client.name}, distance: ${distance(client.position, executor.position).toFixed(3)}, reward: ${client.reward}`);
  const table = tableHeader + tableRows.join("\n");

  return clientsCount === 0 ?
    left("This executor cannot meet the demands of any client!") :
    right(clientsCount === allClientsCount ?
      "This executor meets all demands of all clients!\n\n" :
      result + table);
};

export const main = (sortBy: SortBy): Promise<string> => (
  Promise
    .all([getClients(), getExecutor()]) // Fetch clients and executor
    .then(([clients, executor]) => (
      pipe(
        /**
         * Since the "show" function takes two parameters, the value of which is inside Either
         * clients is Either<string, Array<Client>>, an executor is Either<string, Executor>. How to pass only Array<Client> and Executor to the show?
         * Either is an applicative type class, which means that we can apply each parameter by one
         */
        right(show(sortBy)), // Firstly, we need to lift our function to the Either
        ap(clients), // Apply first parameter
        ap(executor), // Apply second parameter
        flatten, // show at the end returns Either as well, so the result would be Either<string, Either<string, string>>. We need to flatten the result
        getOrElse((err) => err) // In case of any left (error) value, it would be stopped and show error. So, if clients or executor is left, the show would not be called, but onLeft in getOrElse would be called
      )
    ))
);
