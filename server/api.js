const cors = require("cors");
const express = require("express");
const helmet = require("helmet");

const { connect, client } = require("./queries");

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require("body-parser").json());
app.use(cors());
app.use(helmet());

app.options("*", cors());

app.get("/", (request, response) => {
  response.send({ ack: true });
});

app.get("/products/:id", async (request, response) => {
  const mongo = await connect();

  const product = await mongo.findProductById(request.params.id);
  console.log("Products:", product);

  await client.close();

  response.send({ product: product });
});

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
