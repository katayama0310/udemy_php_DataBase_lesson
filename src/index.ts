import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import { addUser, deleteUser, getUser, updateUser } from './user';
import { baseSchema, extendedSchema } from './schema';

type User = {
  last: string;
  first: string;
  born: number;
};

const root = {
  quoteOfTheDay: () => {
    if (Math.random() < 0.5) {
      throw new Error('Failed to fetch quote of the day');
    } else {
      return 'Take it easy';
    }
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
    schema: baseSchema,
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
