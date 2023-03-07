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

  await client.close();

  response.send({ product: product });
});

app.get("/search", async (request, response) => {
  const mongo = await connect();

  const products = await mongo.findProductsByPriceAndByBrand(
    request.query.brand,
    parseInt(request.query.price)
  );

  const productsSliced = request.query.limit
    ? products.slice(0, parseInt(request.query.limit))
    : products;

  await client.close();

  response.send({
    brand: request.query.brand,
    limit: parseInt(request.query.limit),
    total: products.length,
    results: productsSliced,
  });
});

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
