import supertest from "supertest";
import app from "../../src/app";

const api = supertest(app); // subir o app e fornecer uma api de acesso

describe("GET /health", () => {
  it("should return status 200 and a message", async () => {
    const { status, text } = await api.get("/health");
    expect(status).toBe(200);
    expect(text).toBe("I'm OK!");
  });
});
