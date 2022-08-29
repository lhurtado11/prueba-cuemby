const express = require("express");
const getDataScript = require("./script");
const { connectDB } = require("./db/index");
const schema = require("./graphql/schema");
const { graphqlHTTP } = require("express-graphql");

connectDB();
const app = express();
app.get("/", getDataScript);
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(3000);
console.log("server is running on port 3000");
