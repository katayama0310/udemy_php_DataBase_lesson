import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import { addUser, deleteUser, getUser, updateUser } from './user';
import { schema } from './schema';

type User = {
  last: string;
  first: string;
  born: number;
};

const root = {
  quoteOfTheDay: () => {
    Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  rollThreeDice: () => {
    return [1, 2, 3].map((_) => 1 + Math.floor(Math.random() * 6));
  },
  getUser: ({ id }: { id: string }) => getUser(id),
  addUser: ({ last, first, born }: User) => addUser({ last, first, born }),
  updateUser: ({ id, first, last, born }: User & { id: string }) =>
    updateUser({ id, first, last, born }),
  deleteUser: ({ id }: { id: string }) => deleteUser(id),
};

const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
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
