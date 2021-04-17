import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApolloClient, HttpLink, split } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import { setContext } from "@apollo/client/link/context";
import getEnvVars from "../../environment";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const { GRAPHQL_URL, WS_GRAPHQL_URL } = getEnvVars();

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        lotteryBallsById: {
          keyArgs: [],
          merge(existing, incoming, { args: { page = 0, rows = 2 } }) {
            const merged = existing ? Object.assign({}, existing) : { totalRecords: 0, draws: [] };
            merged.totalRecords = incoming.totalRecords;
            let deepArray = merged.draws.slice(0);
            for (let i = 0; i < incoming.draws.length; ++i) {
              deepArray[page * rows + i] = incoming.draws[i];
              merged.draws[page * rows + i] = incoming.draws[i];
            }
            return { ...merged, draws: [...deepArray] };
          },
          // merge(existing = [], incoming, { args: { page = 0, rows = 1 } }) {
          //   const merged = existing ? existing.slice(0) : [];
          //   for (let i = 0; i < incoming.length; ++i) {
          //     merged[page * rows + i] = incoming[i];
          //   }
          //   return merged;
          // },
        },
      },
    },
    User: {
      fields: {
        lotteries: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
});
const wsLink = new WebSocketLink({
  uri: WS_GRAPHQL_URL,
  options: {
    reconnect: true,
  },
});

const authContext = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink
);

const setupApollo = async () => {
  const client = new ApolloClient({
    cache: cache,
    link: authContext.concat(splitLink),
  });

  // set ref for global use
  // eslint-disable-next-line no-undef
  clientRef = client;

  return client;
};

export default setupApollo;
