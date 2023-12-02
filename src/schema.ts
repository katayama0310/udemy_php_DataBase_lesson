import { buildSchema } from 'graphql';

export const schema = buildSchema(`
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
