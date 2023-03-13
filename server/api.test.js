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
});
