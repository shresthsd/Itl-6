const request = require("supertest");
const app = require("../server");

describe("Student API", () => {

  test("GET /students should return all students", async () => {
    const res = await request(app).get("/students");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test("POST /students should add a student", async () => {
    const res = await request(app)
      .post("/students")
      .send({
        name: "Test User",
        age: 22
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe("Test User");
  });

});