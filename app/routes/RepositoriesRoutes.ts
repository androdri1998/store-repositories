import express from "express";
import HTTPStatusCodes from "http-status-codes";

import RepositoriesController from "../controllers/RepositoriesController";

import { createRepository } from "../schemas/RepositorySchema";
import validateRequestMiddleware from "../middlewares/validate-request-middleware";

class RepositoriesRoutes {
  public mainRoutes: express.Router;

  constructor() {
    this.mainRoutes = express.Router();

    this.routes();
  }

  private routes(): void {
    const RepositoriesControllerInstance = new RepositoriesController();

    this.mainRoutes.post(
      "/",
      validateRequestMiddleware(createRepository, "body"),
      RepositoriesControllerInstance.createRepository
    );
    this.mainRoutes.get("/", (req, res) => {
      return res.status(HTTPStatusCodes.OK).send();
    });
    this.mainRoutes.put("/:repository_id", (req, res) => {
      return res.status(HTTPStatusCodes.OK).send();
    });
    this.mainRoutes.delete("/:repository_id", (req, res) => {
      return res.status(HTTPStatusCodes.NO_CONTENT).send();
    });
    this.mainRoutes.post("/:repository_id/like", (req, res) => {
      return res.status(HTTPStatusCodes.CREATED).send();
    });
  }
}

export default RepositoriesRoutes;
