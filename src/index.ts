import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import {
  buildSchema,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
} from 'graphql';

// Define a custom error type
const MyGraphQLError = new GraphQLObjectType({
  name: 'MyGraphQLError',
  fields: {
    message: { type: GraphQLString },
  },
});

// Extend your existing schema to include the error type
const extendedSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'errorrrrr',
    fields: {
      quoteOfTheDay: { type: GraphQLString },
      random: { type: GraphQLFloat },
      rollThreeDice: { type: new GraphQLList(GraphQLFloat) },
    },
  }),
  types: [MyGraphQLError],
  extensions: {
    code: 'GRAPHQL_VALIDATION_FAILED',
  },
});

const root = {
  quoteOfTheDay: () => {
    if (Math.random() < 0.5) {
      return 'Take it easy';
    } else {
      // Throw an error
      throw new Error('An error occurred while generating the quote.');
    }
  },
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1, 2, 3].map((_) => 1 + Math.floor(Math.random() * 6));
  },
};

const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: extendedSchema, // Use the extended schema with custom error type
    rootValue: root,
    graphiql: true,
    customFormatErrorFn: (error) => ({
      message: error.message,
      locations: error.locations,
      path: error.path,
      extensions: {
        code: error.extensions?.code,
      },
    }),
  })
);

app.listen(3000);
console.log('Running a GraphQL API server at http://localhost:3000/graphql');
