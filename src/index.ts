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

import { addUser, deleteUser, getUser, updateUser } from './user';

// Define a custom error type
const MyGraphQLError = new GraphQLObjectType({
  name: 'MyGraphQLError',
  fields: {
    message: { type: GraphQLString },
  },
});

// Extend your existing schema to include the error type
// const extendedSchema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'error',
//     fields: {
//       quoteOfTheDay: { type: GraphQLString },
//       random: { type: GraphQLFloat },
//       rollThreeDice: { type: new GraphQLList(GraphQLFloat) },
//       getUser: { type: firestore.QuerySnapshot<firestore.DocumentData> },
//     },
//   }),
//   types: [MyGraphQLError],
//   extensions: {
//     code: 'GRAPHQL_VALIDATION_FAILED',
//   },
// });

type User = {
  last: string;
  first: string;
  born: number;
};

const schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
    getUser(id: String): User
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
  getUser: ({ id }: { id: string }) => getUser(id),
  addUser: ({ user }: { user: User }) => addUser(user),
  updateUser: ({ id, first, last, born }: User & { id: string }) =>
    updateUser({ id, first, last, born }),
  deleteUser: ({ id }: { id: string }) => deleteUser(id),
};

/**
クエリ
{
  getUser(id: "VNQsGdl1XtnRL01mIkdo") {
    first
    last
    born
  }
  updateUser(id: "VNQsGdl1XtnRL01mIkdo",first:"aaa",last:"bbb",born:1000){
    last
    first
    born
  }
}
*/

const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema, // Use the extended schema with custom error type
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
