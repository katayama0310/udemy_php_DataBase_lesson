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
