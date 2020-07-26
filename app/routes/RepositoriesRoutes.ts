import express from "express";

import RepositoriesController from "../controllers/RepositoriesController";

import {
  createRepository,
  updateRepository,
  deleteRepository,
  createLike,
} from "../schemas/RepositorySchema";
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
    this.mainRoutes.get("/", RepositoriesControllerInstance.listRepositories);
    this.mainRoutes.put(
      "/:repository_id",
      [
        validateRequestMiddleware(updateRepository, "params"),
        validateRequestMiddleware(updateRepository, "body"),
      ],
      RepositoriesControllerInstance.updateRepository
    );
    this.mainRoutes.delete(
      "/:repository_id",
      validateRequestMiddleware(deleteRepository, "params"),
      RepositoriesControllerInstance.deleteRepository
    );
    this.mainRoutes.post(
      "/:repository_id/like",
      validateRequestMiddleware(createLike, "params"),
      RepositoriesControllerInstance.createLike
    );
  }
}

export default RepositoriesRoutes;
