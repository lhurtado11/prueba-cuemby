const { Schema, model } = require("mongoose");

const nationSchema = new Schema(
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

module.exports = model("Nation", nationSchema);
