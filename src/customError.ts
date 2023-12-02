import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLError,
} from 'graphql';

// Define a custom error type
export const MyGraphQLError = new GraphQLObjectType({
  name: 'MyGraphQLError',
  fields: {
    message: { type: GraphQLString },
  },
});

// Extend your existing schema to include the error type
const extendedSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'error',
    fields: {
      quoteOfTheDay: { type: GraphQLString },
      random: { type: GraphQLFloat },
      rollThreeDice: { type: new GraphQLList(GraphQLFloat) },
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'error',
    fields: {
      add: { type: GraphQLFloat },
    },
  }),
  types: [MyGraphQLError],
  extensions: {
    code: 'GRAPHQL_VALIDATION_FAILED',
  },
});
