## Query

```graphql
query {
  getUser(id: "0pM9oh9kYbWdbF3AXP7W") {
    last
  }
}

mutation {
  deleteUser(id: "zVWXOaCjQvPn9mCp8CSS") {
    last
    first
    born
  }
  updateUser(
    id: "VNQsGdl1XtnRL01mIkdo"
    first: "aaa"
    last: "bbb"
    born: 1000
  ) {
    last
    first
    born
  }
}
```

## Schema

```ts
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
```
