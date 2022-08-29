const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const { players } = require("./querys");

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type",
  fields: {
    players,
  },
});
module.exports = new GraphQLSchema({
  query: QueryType,
});
