const request = require("supertest");
const app = require("./api.js");

describe("API endpoints", () => {
  describe("GET /", () => {
    it("responds with JSON containing ack: true", async () => {
      const response = await request(app).get("/");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ ack: true });
    });
  });

  describe("GET /products/:id", () => {
    it("responds with JSON containing the product with the specified ID", async () => {
      const response = await request(app).get("/products/640720061dee8b3ddf9328d2");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("product");
      expect(response.body.product).toHaveProperty("_id", "640720061dee8b3ddf9328d2");
    });
  });

  describe("GET /products", () => {
    it("responds with JSON containing all products", async () => {
      const response = await request(app).get("/products");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("products");
      expect(response.body.products).toBeInstanceOf(Array);
      expect(response.body.products.length).toBeGreaterThan(0);
    });
  });

  describe("GET /products", () => {
    it("responds with JSON containing 12 products", async () => {
      const response = await request(app).get("/products?page=1&size=12");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("products");
      expect(response.body.products).toBeInstanceOf(Array);
      expect(response.body.products.length).toBe(12);
    });
  });

  describe("GET /search", () => {
    it("responds with JSON containing containing brand, limit and total, but no list of results", async () => {
      const response = await request(app).get("/search?brand=Acme&price=50&limit=10");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("brand", "Acme");
      expect(response.body).toHaveProperty("limit", 10);
      expect(response.body).toHaveProperty("total", 0);
      expect(response.body).toHaveProperty("results");
      expect(response.body.results).toBeInstanceOf(Array);
      expect(response.body.results.length).toBe(0);
    });
  });

  describe("GET /search", () => {
    it("responds with JSON containing containing brand, limit and total, but no list of results", async () => {
      const response = await request(app).get("/search?brand=dedicated&price=30&limit=10");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("brand", "dedicated");
      expect(response.body).toHaveProperty("limit", 10);
      expect(response.body).toHaveProperty("total", 3);
      expect(response.body).toHaveProperty("results");
      expect(response.body.results).toBeInstanceOf(Array);
      expect(response.body.results.length).toBe(3);
    });
  });
});
