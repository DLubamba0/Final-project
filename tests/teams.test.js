const request = require("supertest");
const app = require("../server");
const sequelize = require("../database");

let adminToken;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  await request(app).post("/auth/register").send({
    username: "admin",
    email: "admin@test.com",
    password: "admin123",
    role: "admin"
  });

  const loginRes = await request(app).post("/auth/login").send({
    email: "admin@test.com",
    password: "admin123"
  });

  adminToken = loginRes.body.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe("Team Routes", () => {
  test("should create a team as admin", async () => {
    const res = await request(app)
      .post("/teams")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Test Team",
        city: "Test City",
        coach: "Coach Test"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Test Team");
  });

  test("should get all teams", async () => {
    const res = await request(app).get("/teams");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});