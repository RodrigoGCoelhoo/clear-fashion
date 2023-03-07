/* eslint-disable no-console, no-process-exit */
const { v4: uuidv4 } = require("uuid");

const fs = require("fs");

const dedicatedbrand = require("./eshops/dedicatedbrand");
const montlimartbrand = require("./eshops/montlimartbrand");
const circlesportswearbrand = require("./eshops/circlesportswearbrand");

let rawdata = fs.readFileSync("brands.json");
let brands = JSON.parse(rawdata);

products_json = { products: [] };

async function sandbox(eshop) {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop.brand} eshop`);

    let products;

    if (eshop.brand === "DEDICATED") {
      products = await dedicatedbrand.scrape(eshop.url);
    } else if (eshop.brand === "Montlimart") {
      products = await montlimartbrand.scrape(eshop.url);
    } else if (eshop.brand === "Circle Sportswear") {
      products = await circlesportswearbrand.scrape(eshop.url);
    } else {
      console.log("Brand not found!");
      return;
    }

    products.forEach((product) => {
      products_json.products.push({
        id: uuidv4(),
        date: new Date(),
        brand: eshop.brand,
        name: product.name,
        price: product.price,
      });
    });

    console.log(`✅  ${eshop.brand} scrape done.`);
  } catch (e) {
    console.error(e);
  }
}

async function scrape() {
  for (const brand of brands) {
    await sandbox(brand);
  }
  console.log(products_json);
  let data = JSON.stringify(products_json);
  fs.writeFileSync("products_scraped.json", data);
  console.log("✅  products list saved successfully");
}

scrape();

// const eshop1 = "https://www.dedicatedbrand.com/en/men/news";
// const eshop2 = "https://www.montlimart.com/72-nouveautes";
// const eshop3 = "https://shop.circlesportswear.com/collections/collection-homme";

// sandbox(eshop3);
