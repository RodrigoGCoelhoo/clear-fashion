const cors = require("cors");
const express = require("express");
const helmet = require("helmet");

const { connect, client } = require("./queries");

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

app.get("/products", async (request, response) => {
  const mongo = await connect();

  const products = await mongo.findAllProducts();

  if (request.query.page && request.query.size) {
    const pages = Math.ceil(products.length / parseInt(request.query.size));
    const products_paged = products.slice(
      (request.query.page - 1) * request.query.size,
      request.query.page * request.query.size
    );

    await client.close();

    response.send({ products: products_paged });
  } else {
    await client.close();

    response.send({ products: products });
  }
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
