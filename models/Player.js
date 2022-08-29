const { Schema, model } = require("mongoose");

const playerSchema = new Schema(
  {
    id: {
      type: Number,
    },
    name: {
      type: String,
    },
    common_name: {
      type: String,
    },
    position: {
      type: String,
    },
    nationId: {
      type: Number,
    },
    clubId: {
      type: Number,
    },
  },
  {
    versionKey: false,
  }
);
module.exports = model("Player", playerSchema);
