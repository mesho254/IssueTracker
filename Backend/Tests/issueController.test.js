const request = require("supertest");
const express = require("express");
const issueRoutes = require("../Routes/issueRoutes");

const app = express();
app.use(express.json());
app.use("/api", issueRoutes);

describe("Issue Controller", () => {
  it("should return all issues", async () => {
    const res = await request(app).get("/api/issues");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(2);
  });

  it("should return urgent issues", async () => {
    const res = await request(app).get("/api/issues?type=urgent");
    expect(res.statusCode).toEqual(200);
    expect(res.body[0].priority).toBe("High");
  });
});