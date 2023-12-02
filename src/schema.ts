import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLID,
  GraphQLScalarType,
} from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    last: { type: GraphQLString },
    first: { type: GraphQLString },
    born: { type: GraphQLFloat },
  },
});

const baseSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      quoteOfTheDay: { type: GraphQLString },
      rollThreeDice: { type: new GraphQLList(GraphQLFloat) },
      getUser: {
        type: UserType,
        args: { id: { type: GraphQLID } },
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
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
    },
  }),
});

const extendedSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'ExtendedQuery',
    fields: {
      quoteOfTheDay: { type: GraphQLString },
      rollThreeDice: { type: new GraphQLList(GraphQLFloat) },
      getUser: {
        type: UserType,
        args: { id: { type: GraphQLID } },
      },
      add: { type: GraphQLFloat },
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'ExtendedMutation',
    fields: {
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
    },
  }),
  types: Object.values(baseSchema.getTypeMap()).filter(
    (type) => type instanceof GraphQLScalarType
  ),
});

export { baseSchema, extendedSchema };
