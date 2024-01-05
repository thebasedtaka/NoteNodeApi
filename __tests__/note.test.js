const request = require("supertest"); // Import the 'request' object from 'supertest'
const app = require("../app");

describe("Note tests", () => {
  it("should signup successfully", async () => {
    const userCredentials = {
      name: "note",
      email: "note@example.com",
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
      name: "note",
      email: "note@example.com",
      password: "Password1",
    };
    const response = await request(app)
      .post("/api/auth/login")
      .send(userCredentials);
    expect(response.status).toBe(200);
  });

  it("should send note successfully", async () => {
    const body = {
      title: "test",
      content: "content",
    };
    const response = await request(app).post("/api/notes").send(body);
    expect(response.status).toBe(200);
  });
  it("should share note successfully", async () => {
    const body = {
      title: "test",
      content: "other content",
    };
    const response = await request(app)
      .post("/api/notes/65975d80fa17ac45dfa94325/share")
      .send(body);
    expect(response.status).toBe(200);
  });
  it("should get notes successfully", async () => {
    const response = await request(app).get("/api/notes/");
    expect(response.status).toBe(200);
  });
  it("should get speciic note successfully", async () => {
    const response = await request(app).get(
      "/api/notes/65975ff2397b209ecb4b3edc"
    );
    expect(response.status).toBe(200);
  });
  it("should update note successfully", async () => {
    const body = {
      title: "test",
      content: "alternate content",
    };
    const response = await request(app)
      .patch("/api/notes/65975d80fa17ac45dfa94325")
      .send(body);
    expect(response.status).toBe(200);
  });
  it("should delete note successfully", async () => {
    const response = await request(app).delete(
      "/api/notes/65975d80fa17ac45dfa94325"
    );
    expect(response.status).toBe(200);
  });
  it("should search for cheese", async () => {
    const response = await request(app).get("/api/notes?search=cheese");
    expect(response.status).toBe(200);
  });
});
