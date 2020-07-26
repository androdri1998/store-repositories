import { databaseTables } from "../utils/configs";
import { IDeletesSqls } from "./deletes-types";

const deletesSqls: IDeletesSqls = {
  DELETE_VERSION_MIGRATE: `DELETE FROM ${databaseTables.migrateVersions} WHERE version = ?;`,
  DELETE_TECHS_BY_REPOSITORY_ID: `DELETE FROM ${databaseTables.techs} WHERE repository_id = ?;`,
  DELETE_LIKES_BY_REPOSITORY_ID: `DELETE FROM ${databaseTables.likes} WHERE repository_id = ?;`,
  DELETE_REPOSITORY_BY_ID: `DELETE FROM ${databaseTables.repositories} WHERE id = ?;`,
  TRUNCATE_TABLE: `TRUNCATE TABLE :table;`,
};

export default deletesSqls;
