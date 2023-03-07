const { connect, client } = require("./queries");

async function main() {
  const mongo = await connect();

  const productsByBrand = await mongo.findProductsByBrand("DEDICATED");
  console.log("Products by brand DEDICATED:", productsByBrand);

  const productsLessThanPrice = await mongo.findProductsLessThanPrice(50);
  console.log("Products less than 50€:", productsLessThanPrice);

  const productsSortedByPrice = await mongo.findProductsSortedByPrice();
  console.log("Products sorted by price:", productsSortedByPrice);

  const productsSortedByDate = await mongo.findProductsSortedByDate();
  console.log("Products sorted by date:", productsSortedByDate);

  const productsScrapedLessThanTwoWeeks = await mongo.findProductsScrapedLessThanTwoWeeks();
  console.log("Products scraped less than two weeks:", productsScrapedLessThanTwoWeeks);

  await client.close();
}

main();
