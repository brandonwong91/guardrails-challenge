import { Service } from "../service/Service";
import GraphQLJSON from "graphql-type-json";
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar JSON
  input AddResultInput {
    repositoryName: String
    findings: [JSON]
  }
  input UpdateResultInput {
    id: String!
    repositoryName: String
    findings: [JSON]
  }
  type Result {
    id: String!
    status: String
    repositoryName: String
    findings: [JSON]
    queuedAt: String
    scanningAt: String
    finishedAt: String
  }
  type Query {
    hello: String
    getAllResults: [Result]
    getResultById(id: String!): Result
  }
  type Mutation {
    addResult(input: AddResultInput): Result
    updateResultById(input: UpdateResultInput): Result
    removeResultById(id: String!): String
  }
`;
const service = new Service();
const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    getAllResults: async () => await service.findAllResults(),
    getResultById: async (_, args) => await service.findResultById(args),
  },
  Mutation: {
    addResult: async (_, args) => {
      try {
        return await service.addResult(args);
      } catch (e) {
        return e.message;
      }
    },
    updateResultById: async (_, args) => {
      try {
        return await service.updateResultById(args);
      } catch (e) {
        return e.message;
      }
    },
    removeResultById: async (_, args) => {
      try {
        const response = await service.deleteResultById(args);
        if (response.ok) {
          return "Result successfully deleted.";
        }
      } catch (e) {
        return e.message;
      }
    },
  },
};

export { typeDefs, resolvers };
