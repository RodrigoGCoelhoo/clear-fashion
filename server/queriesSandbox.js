const { connect, client } = require("./queries");

async function main() {
  const mongo = await connect();

  //   const productsByBrand = await mongo.findProductsByBrand("DEDICATED");
  //   console.log("Products by brand DEDICATED:", productsByBrand);

  const productsLessThanPrice = await mongo.findProductsLessThanPrice(50);
  console.log("Products less than 50€:", productsLessThanPrice);

  await client.close();
}

main();
