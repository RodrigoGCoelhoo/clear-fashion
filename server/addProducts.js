const { MongoClient } = require("mongodb");
const fs = require("fs");
require("dotenv").config();

const password = process.env.MONGODB_PASSWORD;

let rawdata = fs.readFileSync("products_scraped.json");
let products_json = JSON.parse(rawdata);

const products = products_json.products;

// Tranform String Date in Date Type
const new_products = products.map((products) => {
  return {
    name: products.name,
    brand: products.brand,
    date: new Date(products.date),
    price: products.price,
  };
});

// console.log(new_products);

async function addData() {
  const MONGODB_URI = `mongodb+srv://rodrigogcoelhoo:${password}@clusterclearfashion.7no5kbg.mongodb.net/?retryWrites=true&writeConcern=majority`;
  const MONGODB_DB_NAME = "clearfashion";

  const client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true });
  const db = client.db(MONGODB_DB_NAME);

  const collection = db.collection("products");
  const result = await collection.insertMany(new_products);

  console.log("Data added!");

  client.close();
}

addData();
