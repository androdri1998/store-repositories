import { Request, Response } from "express";
import HTTPStatusCodes from "http-status-codes";

import DatabaseRepository from "../repositories/DatabaseRepository";
import RepositoriesRepository from "../repositories/RepositoriesRepository";

import { IIRepositoriesController } from "./RepositoriesController-types";

export default class RepositoriesController
  implements IIRepositoriesController {
  public async createRepository(
    req: Request,
    res: Response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<Response<any>> {
    const { title, url, techs } = req.body;
    const repository = { title, url, techs };

    const DatabaseRepositoryInstance = new DatabaseRepository();
    const RepositoriesRepositoryInstance = new RepositoriesRepository();
    const responseFunction = await DatabaseRepositoryInstance.executeWithDatabase(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async (CONN: any) => {
        let repositoryCreated;
        let techsCreated;

        try {
          await DatabaseRepositoryInstance.startTransaction(CONN);

          repositoryCreated = await RepositoriesRepositoryInstance.insertRepository(
            CONN,
            {
              title: repository.title,
              url: repository.url,
            }
          );

          await RepositoriesRepositoryInstance.insertLike(
            CONN,
            repositoryCreated.id
          );

          techsCreated = await RepositoriesRepositoryInstance.insertTechs(
            CONN,
            repositoryCreated.id,
            repository.techs
          );

          await DatabaseRepositoryInstance.commit(CONN);
        } catch (err) {
          await DatabaseRepositoryInstance.rollback(CONN);
          throw err;
        }

        return {
          ...repositoryCreated,
          like: 0,
          techs: techsCreated?.map((tech) => tech.tech),
        };
      }
    );
    return res.status(HTTPStatusCodes.CREATED).send(responseFunction);
  }
}
