import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// const GRAPHQL_URI = import.meta.env.PROD 
//   ? "https://game-keeper.vercel.app/graphql" 
//   : "http://localhost:5000/graphql";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI || "http://localhost:5000/graphql", 
  credentials: "include", 
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;