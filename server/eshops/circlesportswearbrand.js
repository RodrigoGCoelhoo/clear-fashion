const fetch = require("node-fetch");
const cheerio = require("cheerio");

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = (data) => {
  const $ = cheerio.load(data);

  return $(".grid__item")
    .map((i, element) => {
      const name = $(element).find(".full-unstyled-link").first().text().trim().replace(/\s/g, " ");
      const price = parseInt($(element).find(".money").first().text().substring(1));

      if (name && price) return { name, price };
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async (url) => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();

      return parse(body);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
