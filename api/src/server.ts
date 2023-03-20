import app from "./app";
import { typeDefs, resolvers } from "./schema/Schema";

const { ApolloServer } = require("apollo-server-express");

const PORT = 3000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: process.env.ENGINE_API_KEY && {
    apiKey: process.env.ENGINE_API_KEY,
  },
});

server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.info(
    `Apollo server listening on http://localhost:3000${server.graphqlPath}`
  );
});
