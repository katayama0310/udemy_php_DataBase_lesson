import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLID,
} from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    last: { type: GraphQLString },
    first: { type: GraphQLString },
    born: { type: GraphQLFloat },
  },
});

export const queryFields = {
  quoteOfTheDay: { type: GraphQLString },
  rollThreeDice: { type: new GraphQLList(GraphQLFloat) },
  getUser: {
    type: UserType,
    args: { id: { type: GraphQLID } },
  },
};

export const mutationFields = {
  addUser: {
    type: UserType,
    args: {
      last: { type: GraphQLString },
      first: { type: GraphQLString },
      born: { type: GraphQLFloat },
    },
  },
  updateUser: {
    type: UserType,
    args: {
      id: { type: GraphQLID },
      last: { type: GraphQLString },
      first: { type: GraphQLString },
      born: { type: GraphQLFloat },
    },
  },
  deleteUser: {
    type: UserType,
    args: { id: { type: GraphQLID } },
  },
};
