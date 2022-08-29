const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");
const { Nation, Club } = require("../models");

const NationType = new GraphQLObjectType({
  name: "NationType",
  description: "The nation type",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
  },
});

const ClubType = new GraphQLObjectType({
  name: "ClubType",
  description: "The club type",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
  },
});

const PlayerType = new GraphQLObjectType({
  name: "PlayerType",
  description: "The player type",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    common_name: { type: GraphQLString },
    position: { type: GraphQLString },
    nationId: { type: GraphQLInt },
    clubId: { type: GraphQLInt },
    nation: {
      type: NationType,
      resolve(parent) {
        return Nation.findOne({ id: parent.nationId }, "name");
      },
    },
    club: {
      type: ClubType,
      resolve(parent) {
        return Club.findOne({ id: parent.clubId }, "name");
      },
    },
    meta: { type: GraphQLString },
  },
});

module.exports = {
  PlayerType,
  ClubType,
  NationType,
};
