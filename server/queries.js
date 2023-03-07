const { MongoClient } = require("mongodb");

const MONGODB_URI =
  "mongodb+srv://rodrigogcoelhoo:nTJTuNg7SA1JecCA@clusterclearfashion.7no5kbg.mongodb.net/?retryWrites=true&writeConcern=majority";
const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const MONGODB_DB_NAME = "clearfashion";
const MONGODB_COLLECTION_NAME = "products";

async function connect() {
  try {
    await client.connect();
    console.log("Connected to server!");
  } catch (e) {
    console.error(e);
  }

  const database = client.db(MONGODB_DB_NAME);
  const collection = database.collection(MONGODB_COLLECTION_NAME);

  // Find all products by brand
  async function findProductsByBrand(brand) {
    const query = { brand: brand };
    const result = await collection.find(query).toArray();
    return result;
  }

  // Find all products less than 50€
  async function findProductsLessThanPrice(price) {
    const query = { price: { $lt: price } };
    const result = await collection.find(query).toArray();
    return result;
  }

  // Find all products sorted by price
  async function findProductsSortedByPrice() {
    const query = {};
    const options = { sort: { price: 1 } };
    const result = await collection.find(query, options).toArray();
    return result;
  }

  // Find all products sorted by date
  async function findProductsSortedByDate() {
    const query = {};
    const options = { sort: { dateAdded: -1 } };
    const result = await collection.find(query, options).toArray();
    return result;
  }

  // Find all products scraped less than 2 weeks
  async function findProductsScrapedLessThanTwoWeeks() {
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    const query = { date: { $gte: twoWeeksAgo } };
    const result = await collection.find(query).toArray();
    return result;
  }

  return {
    findProductsByBrand,
    findProductsLessThanPrice,
    findProductsSortedByPrice,
    findProductsSortedByDate,
    findProductsScrapedLessThanTwoWeeks,
  };
}

module.exports = { connect, client };
