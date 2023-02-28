// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
"use strict";

/*
Description of the available api
GET https://clear-fashion-api.vercel.app/

Search for specific products

This endpoint accepts the following optional query string parameters:

- `page` - page of products to return
- `size` - number of products to return

GET https://clear-fashion-api.vercel.app/brands

Search for available brands list
*/

// current products on the page
let currentProducts = [];
let currentPagination = {};

// instantiate the selectors
const selectShow = document.querySelector("#show-select");
const selectPage = document.querySelector("#page-select");
const selectBrand = document.querySelector("#brand-select");
const selectSort = document.querySelector("#sort-select");
const sectionProducts = document.querySelector("#products");

// Indicators
const spanNbProducts = document.querySelector("#nbProducts");
const spanNbBrands = document.querySelector("#nbBrands");
const spanNbNewProducts = document.querySelector("#nbNewProducts");
const spanP50 = document.querySelector("#p50");
const spanP90 = document.querySelector("#p90");
const spanP95 = document.querySelector("#p95");
const lastReleased = document.querySelector("#lastReleased");

// instantiate the checkers
const checkerRecentlyReleased = document.querySelector("#recently-released-checker");
const checkerReasonablePrice = document.querySelector("#reasonable-price-checker");

// Favorited
let favoritedUUIDs = JSON.parse(localStorage.getItem("MY_FAVORITE_PRODUCTS"));

/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({ result, meta }) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @param  {String}
 * @param  {String}
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12, brand = "") => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}&brand=${brand}`
    );

    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return { currentProducts, currentPagination };
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return { currentProducts, currentPagination };
  }
};

/**
 * Fetch ALL products from api
 */
const fetchAllProducts = async () => {
  try {
    const response = await fetch(`https://clear-fashion-api.vercel.app/`);
    const body = await response.json();
    const number_of_products = body.data.meta.count;

    if (body.success !== true) {
      console.error(body);
      return { currentProducts, currentPagination };
    } else {
      const response = await fetch(
        `https://clear-fashion-api.vercel.app/?size=${number_of_products}`
      );
      const body = await response.json();
      return body.data;
    }
  } catch (error) {
    console.error(error);
    return { currentProducts, currentPagination };
  }
};

/**
 * Fetch brand from api
 * @return {Array}
 */
const fetchBrands = async () => {
  try {
    const response = await fetch(`https://clear-fashion-api.vercel.app/brands`);
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
    }
    return body.data.result;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = (products) => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement("div");
  const template = products
    .map((product) => {
      if (favoritedUUIDs.includes(product.uuid)) {
        return `
        <div class="product" id=${product.uuid}>
          <span>${product.brand}</span>
          <a href="${product.link}" target=”_blank”>${product.name}</a>
          <span>${product.price}</span>
          <input type="checkbox" id="favoriteSelect" value=${product.uuid} checked></input>
        </div>
      `;
      } else {
        return `
        <div class="product" id=${product.uuid}>
          <span>${product.brand}</span>
          <a href="${product.link}" target=”_blank”>${product.name}</a>
          <span>${product.price}</span>
          <input type="checkbox" id="favoriteSelect" value=${product.uuid}></input>
        </div>
      `;
      }

      return;
    })
    .join("");

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = "<h2>Products</h2>";
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = (pagination) => {
  const { currentPage, pageCount } = pagination;
  const options = Array.from(
    { length: pageCount },
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join("");

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render brand selector
 */
const renderBrand = async () => {
  const brands = await fetchBrands();

  let options = `<option value="">All</option>`;

  brands
    .map((brand) => {
      options += `<option value="${brand}">${brand}</option>`;
    })
    .join("");

  selectBrand.innerHTML = options;
};
renderBrand();

/**
 * After render to execute after all the products render happen
 */
const afterRender = async () => {
  const favoriteSelects = document.querySelectorAll("#favoriteSelect");

  favoriteSelects.forEach((item) => {
    item.addEventListener("change", async (event) => {
      const product_UUId = event.target.value;
      if (item.checked) {
        favoritedUUIDs.push(product_UUId);
      } else {
        favoritedUUIDs = favoritedUUIDs.filter((uuid) => uuid !== product_UUId);
      }
      localStorage.setItem("MY_FAVORITE_PRODUCTS", JSON.stringify(favoritedUUIDs));
    });
  });
};

const render = async (products, pagination) => {
  await renderProducts(products);
  await renderPagination(pagination);
  afterRender();
};

/**
 * Declaration indicators
 */

const getIndicators = async () => {
  const brands = await fetchBrands();
  const products = await fetchAllProducts();

  // Total number of products
  spanNbProducts.innerHTML = products.result.length;

  // Total number of brands
  spanNbBrands.innerHTML = brands.length;

  // Number of recent products
  const now = new Date();
  const two_weeks_ago = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  const nbRecentProducts = products.result.filter((product) => {
    return new Date(product.released) > two_weeks_ago;
  }).length;
  spanNbNewProducts.innerHTML = nbRecentProducts;

  // Percentile
  const sortedProductsPrice = products.result.sort((productA, productB) =>
    productA.price > productB.price ? 1 : -1
  );

  // p50
  const p50_index = Math.floor(products.result.length * 0.5);
  spanP50.innerHTML = sortedProductsPrice[p50_index].price;

  // p90
  const p90_index = Math.floor(products.result.length * 0.9);
  spanP90.innerHTML = sortedProductsPrice[p90_index].price;

  // p95
  const p95_index = Math.floor(products.result.length * 0.95);
  spanP95.innerHTML = sortedProductsPrice[p95_index].price;

  // Date
  const last_date = products.result.sort((productA, productB) => {
    const productADate = new Date(productA.released);
    const productBDate = new Date(productB.released);
    return productADate < productBDate ? 1 : -1;
  })[0];

  lastReleased.innerHTML = last_date.released;
};

getIndicators();

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 */
selectShow.addEventListener("change", async (event) => {
  const products = await fetchProducts(currentPagination.currentPage, parseInt(event.target.value));

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

document.addEventListener("DOMContentLoaded", async () => {
  const products = await fetchProducts();

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

/**
 * Select the page of products
 */

selectPage.addEventListener("change", async (event) => {
  const products = await fetchProducts(parseInt(event.target.value), currentPagination.pageSize);

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

/**
 * Select the brand
 */

selectBrand.addEventListener("change", async (event) => {
  currentPagination.currentPage = 1;
  currentPagination.brand = event.target.value;

  const products = await fetchProducts(
    currentPagination.currentPage,
    currentPagination.pageSize,
    currentPagination.brand
  );

  // console.log(products);

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

/**
 * Select checkbox recently released
 */

checkerRecentlyReleased.addEventListener("change", async (event) => {
  let products = {};
  if (checkerRecentlyReleased.checked) {
    const all_products = await fetchAllProducts();

    const now = new Date();
    const two_weeks_ago = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    products.result = all_products.result.filter((product) => {
      return new Date(product.released) > two_weeks_ago;
    });
    products.meta = all_products.meta;
  } else {
    products = await fetchProducts(1, 12, "");
  }

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

/**
 * Select checkbox reasonable price
 */

checkerReasonablePrice.addEventListener("change", async (event) => {
  let products = {};

  if (checkerReasonablePrice.checked) {
    const all_products = await fetchAllProducts();
    products.result = all_products.result.filter((product) => {
      return product.price <= 50;
    });

    // products.result = products.result.slice(0, currentPagination.pageSize);

    products.meta = all_products.meta;
  } else {
    products = await fetchProducts(1, 12, "");
  }

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

/**
 * Sort selector
 */

selectSort.addEventListener("change", async (event) => {
  let products = {};
  const all_products = await fetchAllProducts();
  products.meta = currentPagination;
  if (event.target.value === "price-asc") {
    products.result = all_products.result.sort((productA, productB) =>
      productA.price > productB.price ? 1 : -1
    );
  } else if (event.target.value === "price-desc") {
    products.result = all_products.result.sort((productA, productB) =>
      productA.price < productB.price ? 1 : -1
    );
  } else if (event.target.value === "date-asc") {
    products.result = all_products.result.sort((productA, productB) => {
      const productADate = new Date(productA.released);
      const productBDate = new Date(productB.released);
      return productADate < productBDate ? 1 : -1;
    });
  } else if (event.target.value === "date-desc") {
    products.result = all_products.result.sort((productA, productB) => {
      const productADate = new Date(productA.released);
      const productBDate = new Date(productB.released);
      return productADate > productBDate ? 1 : -1;
    });
  } else {
    products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize);
  }

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});
