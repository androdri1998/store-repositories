/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidV4 } from "uuid";
import moment from "moment";

import DatabaseRepository from "./DatabaseRepository";

import insertsSqls from "../sqls/inserts";

import {
  IRepository,
  IRepositoryCreated,
  ILikeCreated,
  ITechCreated,
} from "./RepositoriesRepository-types";

export default class RepositoriesRepository {
  public async insertRepository(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    CONN: any,
    repository: IRepository
  ): Promise<IRepositoryCreated> {
    const DatabaseRepositoryInstance = new DatabaseRepository();
    const repositoryId = uuidV4();
    const createdAt = moment().utc().format("YYYY-MM-DD HH:mm:ss");

    await DatabaseRepositoryInstance.query(
      CONN,
      insertsSqls.INSERT_REPOSITORY,
      [repositoryId, repository.title, repository.url, createdAt]
    );

    const repositoryCreated = {
      id: repositoryId,
      title: repository.title,
      url: repository.url,
      created_at: createdAt,
    };

    return repositoryCreated;
  }

  public async insertLike(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    CONN: any,
    repositoryId: string
  ): Promise<ILikeCreated> {
    const DatabaseRepositoryInstance = new DatabaseRepository();
    const likeId = uuidV4();
    const createdAt = moment().utc().format("YYYY-MM-DD HH:mm:ss");

    await DatabaseRepositoryInstance.query(CONN, insertsSqls.INSERT_LIKE, [
      likeId,
      repositoryId,
      createdAt,
    ]);

    const likeCreated: ILikeCreated = {
      id: likeId,
      repository_id: repositoryId,
      created_at: createdAt,
    };

    return likeCreated;
  }

  public async insertTechs(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    CONN: any,
    repositoryId: string,
    techs: string[]
  ): Promise<ITechCreated[]> {
    const DatabaseRepositoryInstance = new DatabaseRepository();

    const techsCreateds: ITechCreated[] = await Promise.all(
      techs.map(async (tech) => {
        const techId = uuidV4();
        const createdAt = moment().utc().format("YYYY-MM-DD HH:mm:ss");

        await DatabaseRepositoryInstance.query(CONN, insertsSqls.INSERT_TECH, [
          techId,
          repositoryId,
          tech,
          createdAt,
        ]);

        const techCreated = {
          id: techId,
          repository_id: repositoryId,
          tech,
          created_at: createdAt,
        };

        return techCreated;
      })
    );

    return techsCreateds;
  }
}
