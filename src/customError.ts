import { GraphQLError, GraphQLObjectType, GraphQLString } from 'graphql';

// Define a custom error type
export const MyGraphQLError = new GraphQLObjectType({
  name: 'MyGraphQLError',
  fields: {
    message: { type: GraphQLString },
  },
});

export const customError = () => {
  throw new GraphQLError('user aleady exists', {
    extensions: {
      code: '該当のユーザーは既に存在します。',
    },
  });
};
