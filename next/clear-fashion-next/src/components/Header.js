import { Select, Checkbox, ConfigProvider, Button } from "antd";

import styles from "@/styles/Header.module.css";

export default function Header() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#8cada7",
          },
        }}
      >
        <h1 className={styles.brandName}>Clear Fashion</h1>

        <main className={styles.main}>
          <section className={styles.column}>
            <h3 className={styles.title}>Show</h3>
            <Select
              defaultValue="lucy"
              style={{ width: "90%", marginBottom: "1rem" }}
              // onChange={handleChange}
              options={[
                { value: "12", label: "12" },
                { value: "24", label: "24" },
                { value: "36", label: "36" },
              ]}
            />
            <h3 className={styles.title}>Page</h3>
            <Select
              defaultValue="lucy"
              style={{ width: "90%" }}
              // onChange={handleChange}
              options={[
                { value: "12", label: "12" },
                { value: "24", label: "24" },
                { value: "36", label: "36" },
              ]}
            />
          </section>

          <section className={styles.column}>
            <h3 className={styles.title}>Brand</h3>
            <Select
              defaultValue="lucy"
              style={{ width: "90%", marginBottom: "1rem" }}
              // onChange={handleChange}
              options={[
                { value: "12", label: "12" },
                { value: "24", label: "24" },
                { value: "36", label: "36" },
              ]}
            />
            <h3 className={styles.title}>Filter by</h3>
            <Select
              defaultValue="lucy"
              style={{ width: "90%" }}
              // onChange={handleChange}
              options={[
                { value: "12", label: "12" },
                { value: "24", label: "24" },
                { value: "36", label: "36" },
              ]}
            />
          </section>

          <section className={styles.column}>
            <h3 className={styles.title}>Filter by</h3>
            <Checkbox>Reasonable price</Checkbox>
            <Checkbox style={{ margin: 0 }}>Recently released</Checkbox>
            <Checkbox style={{ margin: 0 }}>Favorites</Checkbox>
            <Button type="primary" style={{ alignSelf: "center", marginTop: "1rem" }}>
              RESET
            </Button>
          </section>

          <section className={styles.column}>
            <h3 className={styles.title}>Indicators</h3>
            <div className={styles.info}>
              <span className={styles.data}>222</span>
              <span> products</span>
            </div>
            <div className={styles.info}>
              <span className={styles.data}>8</span>
              <span> brands</span>
            </div>
            <div className={styles.info}>
              <span className={styles.data}>0</span>
              <span> new products</span>
            </div>
            <div className={styles.info}>
              <span className={styles.data}>22/01/2023</span>
              <span> last release</span>
            </div>
          </section>

          <section className={styles.column}>
            <h3 className={styles.title}>Percentile</h3>
            <div className={styles.info}>
              <span className={styles.data}>50th:</span>
              <span> 99,00 €</span>
            </div>
            <div className={styles.info}>
              <span className={styles.data}>90th:</span>
              <span> 199,00 €</span>
            </div>
            <div className={styles.info}>
              <span className={styles.data}>95th:</span>
              <span> 239,00 €</span>
            </div>
          </section>
        </main>
      </ConfigProvider>

      {/* <section id="options">
        <div class="column">
          <div id="show" class="selector-div">
            <h6 for="show-select">Show</h6>
            <select name="show" id="show-select">
              <option value="12">12 items</option>
              <option value="24">24 items</option>
              <option value="48">48 items</option>
            </select>
          </div>
          <div id="page" class="selector-div">
            <h6 for="page-select">Page</h6>
            <select name="page" id="page-select"></select>
          </div>
        </div>

        <div class="column">
          <div id="brand" class="selector-div">
            <h6 for="brand-select">Brand</h6>
            <select name="brand" id="brand-select"></select>
          </div>
          <div id="sort" class="selector-div">
            <h6 for="sort-select">Filter by</h6>
            <select name="sort" id="sort-select">
              <option value="none"></option>
              <option value="price-asc">Cheaper</option>
              <option value="price-desc">Expensive</option>
              <option value="date-asc">Recently released</option>
              <option value="date-desc">Anciently released</option>
            </select>
          </div>
        </div>
        <div id="filters" class="column">
          <h6>Filter by</h6>
          <label for="reasonable-price-checker">
            <input type="checkbox" id="reasonable-price-checker">
              Reasonable price
            </input>
          </label>
          <label for="recently-released-checker">
            <input type="checkbox" id="recently-released-checker">
              Recently released
            </input>
          </label>
          <label for="favorited-items">
            <input type="checkbox" id="favorited-items">
              Favorites
            </input>
          </label>

          <button class="reset" id="reset">
            RESET FILTERS
          </button>
        </div>

        <div class="column">
          <h6>Indicators</h6>
          <div>
            <span id="nbProducts">0</span>
            <span>products</span>
          </div>
          <div>
            <span id="nbBrands">0</span>
            <span>brands</span>
          </div>
          <div>
            <span id="nbNewProducts">0</span>
            <span> new products</span>
          </div>
          <div>
            <span id="lastReleased"></span>
            <span>last release</span>
          </div>
        </div>

        <div class="column">
          <h6>Percentiles</h6>
          <div>
            <span>50th:</span>
            <span id="p50">0</span>
            <span>€</span>
          </div>
          <div>
            <span>90th:</span>
            <span id="p90">0</span>
            <span>€</span>
          </div>
          <div>
            <span>95th:</span>
            <span id="p95">0</span>
            <span>€</span>
          </div>
        </div>
      </section> */}
    </>
  );
}
