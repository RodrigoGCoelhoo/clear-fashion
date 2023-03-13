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
});
