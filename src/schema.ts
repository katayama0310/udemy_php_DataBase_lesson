import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { MyGraphQLError } from './customError';
import { mutationFields, queryFields } from './field';

const baseSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: queryFields,
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutationFields,
  }),
});

const extendedSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'ExtendedQuery',
    fields: queryFields,
  }),
  mutation: new GraphQLObjectType({
    name: 'ExtendedMutation',
    fields: mutationFields,
  }),
  types: [MyGraphQLError],
  extensions: {
    code: 'GRAPHQL_VALIDATION_FAILED',
  },
});

export { baseSchema, extendedSchema };
