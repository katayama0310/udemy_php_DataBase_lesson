import {
  buildSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema,
} from 'graphql';
import { MyGraphQLError } from './customError';

type User = {
  last: string;
  first: string;
  born: number;
};

const baseSchema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    rollThreeDice: [Int]
    getUser(id: String): User
  }

  type Mutation {
    addUser(last: String, first: String, born: Int): User
    updateUser(id: String, last: String, first: String, born: Int): User
    deleteUser(id: String): User
  }

  type User {
    last: String
    first: String
    born: Int
  }
`);

const extendedQueryType = new GraphQLObjectType({
  name: 'ExtendedQuery',
  fields: {
    quoteOfTheDay: { type: GraphQLString },
    rollThreeDice: { type: new GraphQLList(GraphQLFloat) },
  },
});

const extendedMutationType = new GraphQLObjectType({
  name: 'ExtendedMutation',
  fields: {
    add: { type: GraphQLFloat },
  },
});

const extendedSchema = new GraphQLSchema({
  query: extendedQueryType,
  mutation: extendedMutationType,
  types: [MyGraphQLError],
  extensions: {
    code: 'GRAPHQL_VALIDATION_FAILED',
  },
});

export { baseSchema, extendedSchema };
