const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://root:rootmongo@db-cuemby.oozuvv6.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("MongoDB Connected");
};

module.exports = { connectDB };
