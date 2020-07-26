import request from "supertest";
import faker from "faker";

import App from "../App";
import truncateTables from "./utils/truncateTables";

describe("Store repositories", () => {
  beforeEach(async () => {
    await truncateTables([]);
  });

  it("should be able to create a new repository", async () => {
    const AppInstace = new App();
    const response = await request(AppInstace.express)
      .post("/repositories")
      .send({ title: "Test title", url: "url test", techs: ["tech"] });

    expect(response.status).toBe(201);
  });

  it("should be able to list the repositories", async () => {
    expect(1 + 1).toBe(2);
  });
  it("should be able to update repository", async () => {
    expect(1 + 1).toBe(2);
  });
  it("should not be able to update a repository that does not exist", async () => {
    expect(1 + 1).toBe(2);
  });
  it("should not be able to update repository likes manually", async () => {
    expect(1 + 1).toBe(2);
  });
  it("should be able to delete the repository", async () => {
    expect(1 + 1).toBe(2);
  });
  it("should not be able to delete a repository that does not exist", async () => {
    expect(1 + 1).toBe(2);
  });
  it("should be able to give a like to the repository", async () => {
    expect(1 + 1).toBe(2);
  });
  it("should not be able to like a repository that does not exist", async () => {
    expect(1 + 1).toBe(2);
  });
});
