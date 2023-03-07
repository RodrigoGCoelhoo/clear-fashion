const { connect, client } = require("./queries");

async function main() {
  const mongo = await connect();

  const productsByBrand = await mongo.findProductsByBrand("DEDICATED");
  console.log("Products by brand DEDICATED:", productsByBrand);

  await client.close();
}

main();
