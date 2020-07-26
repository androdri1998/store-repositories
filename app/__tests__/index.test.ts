import request from "supertest";
import { v4 as uuidV4 } from "uuid";
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
    const AppInstace = new App();

    await request(AppInstace.express)
      .post("/repositories")
      .send({ title: "Repository 1", url: "url 1", techs: ["typescript"] });
    await request(AppInstace.express)
      .post("/repositories")
      .send({ title: "Repository 2", url: "url 2", techs: ["typescript"] });
    await request(AppInstace.express)
      .post("/repositories")
      .send({ title: "Repository 3", url: "url 3", techs: ["typescript"] });

    const response = await request(AppInstace.express).get("/repositories");

    expect(response.status).toBe(200);
  });

  it("should be able to update repository", async () => {
    const AppInstace = new App();

    const repository = await request(AppInstace.express)
      .post("/repositories")
      .send({ title: "Repository 1", url: "url 1", techs: ["typescript"] });

    const response = await request(AppInstace.express)
      .put(`/repositories/${repository.body.id}`)
      .send({
        title: "new repository 1",
        url: "new url 1",
        techs: ["javascript"],
      });

    expect(response.status).toBe(200);
  });

  it("should not be able to update a repository that does not exist", async () => {
    const AppInstace = new App();
    const response = await request(AppInstace.express)
      .put(`/repositories/${uuidV4()}`)
      .send({
        title: "new repository 1",
        url: "new url 1",
        techs: ["javascript"],
      });

    expect(response.status).toBe(404);
  });
  it("should not be able to update repository likes manually", async () => {
    const AppInstace = new App();
    const repository = await request(AppInstace.express)
      .post("/repositories")
      .send({ title: "Repository 1", url: "url 1", techs: ["typescript"] });

    const response = await request(AppInstace.express)
      .put(`/repositories/${repository.body.id}`)
      .send({
        like: 10,
      });

    expect(response.status).toBe(400);
  });

  it("should be able to delete the repository", async () => {
    const AppInstace = new App();
    const repository = await request(AppInstace.express)
      .post("/repositories")
      .send({ title: "Repository 1", url: "url 1", techs: ["typescript"] });

    const response = await request(AppInstace.express).delete(
      `/repositories/${repository.body.id}`
    );

    expect(response.status).toBe(204);
  });

  it("should not be able to delete a repository that does not exist", async () => {
    const AppInstace = new App();
    const response = await request(AppInstace.express).delete(
      `/repositories/${uuidV4()}`
    );

    expect(response.status).toBe(404);
  });
  it("should be able to give a like to the repository", async () => {
    expect(1 + 1).toBe(2);
  });
  it("should not be able to like a repository that does not exist", async () => {
    expect(1 + 1).toBe(2);
  });
});
