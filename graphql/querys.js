const { GraphQLList, GraphQLString, GraphQLInt } = require("graphql");
const { PlayerType, ClubType, NationType } = require("./types");
const { Player, Club, Nation } = require("../models/index");

const players = {
  type: new GraphQLList(PlayerType),
  description: "Return Array",
  args: {
    search: { type: GraphQLString },
    order: { type: GraphQLString },
    page: { type: GraphQLInt },
    name: { type: GraphQLString },
  },
  async resolve(_, args) {
    let query;
    let queryc = args.name ? { name: args.name } : false;
    let clubId;
    if (queryc) {
      const club = await Club.findOne(queryc);
      clubId = club.id;
    }

    if (args?.search && args?.name) {
      query = {
        name: { $regex: ".*" + args.search + ".*", $options: "i" },
        clubId: clubId,
      };
    } else if (args?.search) {
      query = { name: { $regex: ".*" + args.search + ".*", $options: "i" } };
    } else if (args?.name) {
      query = { clubId: clubId };
    } else {
      query = "go";
    }

    let skip = 0;
    let sort = "asc";
    if (args.order == "desc") {
      sort = "desc";
    }

    let perPage = 2;
    let page = args.page ? args.page : 1;
    if (page > 1) {
      skip = perPage * (page - 1);
    }

    const players = await Player.find(query).limit(perPage).skip(skip).sort({
      id: sort,
    });

    const count = await Player.countDocuments();

    players["meta"] = {
      totalPages: Math.ceil(count / perPage),
      page: page,
    };
    console.log(args);
    return players;
  },
};

const clubs = {
  type: new GraphQLList(ClubType),
  description: "Return Array",
  async resolve() {
    const clubs = await Club.find();
    console.log(clubs);
    return clubs;
  },
};

const nations = {
  type: new GraphQLList(NationType),
  description: "Return Array",
  async resolve() {
    const nations = await Nation.find();
    console.log(nations);
    return nations;
  },
};

module.exports = { players, clubs, nations };
