const { Schema, model } = require("mongoose");

const clubSchema = new Schema(
  {
    id: {
      type: Number,
    },
    name: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Club", clubSchema);
