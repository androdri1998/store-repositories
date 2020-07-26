import { Request, Response } from "express";
import HTTPStatusCodes from "http-status-codes";

import DatabaseRepository from "../repositories/DatabaseRepository";
import RepositoriesRepository from "../repositories/RepositoriesRepository";
import { CustomNotFoundError } from "../utils/Errors";

import {
  IRepositoriesController,
  IRepository,
  ITech,
} from "./RepositoriesController-types";

export default class RepositoriesController implements IRepositoriesController {
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

          // await RepositoriesRepositoryInstance.insertLike(
          //   CONN,
          //   repositoryCreated.id
          // );

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

  public async listRepositories(
    req: Request,
    res: Response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<Response<any>> {
    const DatabaseRepositoryInstance = new DatabaseRepository();
    const RepositoriesRepositoryInstance = new RepositoriesRepository();
    const responseFunction = await DatabaseRepositoryInstance.executeWithDatabase(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async (CONN: any) => {
        const repositories = await RepositoriesRepositoryInstance.getRepositories(
          CONN
        );

        const serializedRepositories = await Promise.all(
          repositories.map(async (repository: IRepository) => {
            const totalLikes = await RepositoriesRepositoryInstance.getCountLikes(
              CONN,
              repository.id
            );

            const techsCreated = await RepositoriesRepositoryInstance.getTechs(
              CONN,
              repository.id
            );

            const responseRepository = {
              ...repository,
              likes: totalLikes,
              techs: techsCreated.map((tech: ITech) => tech.tech),
            };

            return responseRepository;
          })
        );

        return serializedRepositories;
      }
    );
    return res.status(HTTPStatusCodes.OK).send(responseFunction);
  }

  public async updateRepository(
    req: Request,
    res: Response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<Response<any>> {
    const { repository_id } = req.params;
    const { title, url, techs } = req.body;

    const DatabaseRepositoryInstance = new DatabaseRepository();
    const RepositoriesRepositoryInstance = new RepositoriesRepository();

    const responseFunction = await DatabaseRepositoryInstance.executeWithDatabase(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async (CONN: any) => {
        let responseRepository;
        try {
          await DatabaseRepositoryInstance.startTransaction(CONN);
          const checkRepository = await RepositoriesRepositoryInstance.getRepository(
            CONN,
            repository_id
          );
          if (!checkRepository) {
            throw new CustomNotFoundError("repository not found");
          }
          await RepositoriesRepositoryInstance.updateRepository(
            CONN,
            repository_id,
            { title, url, techs }
          );
          const repository = await RepositoriesRepositoryInstance.getRepository(
            CONN,
            repository_id
          );
          const totalLikes = await RepositoriesRepositoryInstance.getCountLikes(
            CONN,
            repository.id
          );
          const techsCreated = await RepositoriesRepositoryInstance.getTechs(
            CONN,
            repository.id
          );
          responseRepository = {
            ...repository,
            likes: totalLikes,
            techs: techsCreated.map((tech: ITech) => tech.tech),
          };
          await DatabaseRepositoryInstance.commit(CONN);
        } catch (err) {
          await DatabaseRepositoryInstance.rollback(CONN);
          throw err;
        }

        return responseRepository;
      }
    );

    return res.status(HTTPStatusCodes.OK).send(responseFunction);
  }
}
