const request = require("supertest"); // Import the 'request' object from 'supertest'
const app = require("../app");

describe("auth test", () => {
  //test if server is running
  it("should not find route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(404);
  });
  it("should signup successfully", async () => {
    const userCredentials = {
      name: "jest",
      email: "jest@example.com",
      password: "Password1",
      passwordConfirm: "Password1",
    };

    const response = await request(app)
      .post("/api/auth/signup")
      .send(userCredentials);
    expect(response.status).toBe(200);
  });

  it("should login successfully", async () => {
    const userCredentials = {
      name: "jest",
      email: "jest@example.com",
      password: "Password1",
    };

    const response = await request(app)
      .post("/api/auth/login")
      .send(userCredentials);
    expect(response.status).toBe(200);
  });
});
