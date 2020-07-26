import { databaseTables } from "../utils/configs";
import { ISelectsSqls } from "./selects-types";

const selectsSqls: ISelectsSqls = {
  SELECT_TABLE_MYSQL: `SELECT * FROM information_schema.tables WHERE table_name = ? LIMIT 1;`,
  SELECT_MIGRATE_VERSION: `
    SELECT version FROM ${databaseTables.migrateVersions} WHERE version = ?;
  `,
  SELECT_REPOSITORIES: `
    SELECT * FROM ${databaseTables.repositories};
  `,
  SELECT_COUNT_LIKES_BY_REPOSITORY_ID: `
    SELECT count(id) total FROM ${databaseTables.likes} WHERE repository_id = ?;
  `,
  SELECT_TECHS_BY_REPOSITORY_ID: `
    SELECT * FROM ${databaseTables.techs} WHERE repository_id = ?;
  `,
};

export default selectsSqls;
