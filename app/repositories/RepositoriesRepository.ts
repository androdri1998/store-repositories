/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidV4 } from "uuid";
import moment from "moment";

import DatabaseRepository from "./DatabaseRepository";

import insertsSqls from "../sqls/inserts";
import selectsSqls from "../sqls/selects";
import updatesSqls from "../sqls/updates";
import deletesSqls from "../sqls/deletes";

import {
  IRepository,
  IRepositoryCreated,
  ILikeCreated,
  ITechCreated,
  IParamsUpdateRepository,
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

  public async getRepositories(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    CONN: any
  ): Promise<any> {
    const DatabaseRepositoryInstance = new DatabaseRepository();

    const repositories = await DatabaseRepositoryInstance.query(
      CONN,
      selectsSqls.SELECT_REPOSITORIES
    );

    return repositories;
  }

  public async getRepository(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    CONN: any,
    repositoryId: string
  ): Promise<any> {
    const DatabaseRepositoryInstance = new DatabaseRepository();

    const repositoryArr = await DatabaseRepositoryInstance.query(
      CONN,
      selectsSqls.SELECT_REPOSITORY_BY_ID,
      [repositoryId]
    );

    return repositoryArr[0];
  }

  public async getCountLikes(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    CONN: any,
    repositoryId: string
  ): Promise<any> {
    const DatabaseRepositoryInstance = new DatabaseRepository();

    const [likesTotal] = await DatabaseRepositoryInstance.query(
      CONN,
      selectsSqls.SELECT_COUNT_LIKES_BY_REPOSITORY_ID,
      [repositoryId]
    );

    return likesTotal.total;
  }

  public async getTechs(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    CONN: any,
    repositoryId: string
  ): Promise<any> {
    const DatabaseRepositoryInstance = new DatabaseRepository();

    const techs = await DatabaseRepositoryInstance.query(
      CONN,
      selectsSqls.SELECT_TECHS_BY_REPOSITORY_ID,
      [repositoryId]
    );

    return techs;
  }

  public async updateRepository(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    CONN: any,
    repositoryId: string,
    values: IParamsUpdateRepository
  ): Promise<any> {
    const DatabaseRepositoryInstance = new DatabaseRepository();

    const sets = [];
    if (values.url) {
      sets.push(`url = ${CONN.escape(values.url)}`);
    }

    if (values.title) {
      sets.push(`title = ${CONN.escape(values.title)}`);
    }

    if (values.techs && values.techs?.length > 0) {
      await DatabaseRepositoryInstance.query(
        CONN,
        deletesSqls.DELETE_TECHS_BY_REPOSITORY_ID,
        [repositoryId]
      );

      await this.insertTechs(CONN, repositoryId, values.techs);
    }

    if (sets.length > 0) {
      const HANDLE_UPDATE_REPOSITORIE = updatesSqls.UPDATE_REPOSITORY.replace(
        ":sets",
        sets.join(", ")
      );

      await DatabaseRepositoryInstance.query(CONN, HANDLE_UPDATE_REPOSITORIE, [
        repositoryId,
      ]);
    }

    return true;
  }

  public async deleteRepository(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    CONN: any,
    repositoryId: string
  ): Promise<any> {
    const DatabaseRepositoryInstance = new DatabaseRepository();
    await DatabaseRepositoryInstance.query(
      CONN,
      deletesSqls.DELETE_REPOSITORY_BY_ID,
      [repositoryId]
    );

    return true;
  }

  public async deleteLikes(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    CONN: any,
    repositoryId: string
  ): Promise<any> {
    const DatabaseRepositoryInstance = new DatabaseRepository();
    await DatabaseRepositoryInstance.query(
      CONN,
      deletesSqls.DELETE_LIKES_BY_REPOSITORY_ID,
      [repositoryId]
    );

    return true;
  }

  public async deleteTechs(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    CONN: any,
    repositoryId: string
  ): Promise<any> {
    const DatabaseRepositoryInstance = new DatabaseRepository();
    await DatabaseRepositoryInstance.query(
      CONN,
      deletesSqls.DELETE_TECHS_BY_REPOSITORY_ID,
      [repositoryId]
    );

    return true;
  }
}
