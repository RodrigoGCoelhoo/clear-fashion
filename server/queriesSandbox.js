const { connect, client } = require("./queries");

async function main() {
  const mongo = await connect();

  //   const productsByBrand = await mongo.findProductsByBrand("DEDICATED");
  //   console.log("Products by brand DEDICATED:", productsByBrand);

  //   const productsLessThanPrice = await mongo.findProductsLessThanPrice(50);
  //   console.log("Products less than 50€:", productsLessThanPrice);

  const productsSortedByPrice = await mongo.findProductsSortedByPrice();
  console.log("Products sorted by price:", productsSortedByPrice);

  await client.close();
}

main();
