import { GraphQLObjectType, GraphQLString } from 'graphql';

// Define a custom error type
export const MyGraphQLError = new GraphQLObjectType({
  name: 'MyGraphQLError',
  fields: {
    message: { type: GraphQLString },
  },
});
