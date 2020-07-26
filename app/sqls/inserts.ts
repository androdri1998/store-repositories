import { databaseTables } from "../utils/configs";
import { IInsertsSqls } from "./inserts-types";

const insertsSqls: IInsertsSqls = {
  INSERT_VERSION_MIGRATE: `INSERT INTO
    ${databaseTables.migrateVersions}(id, version, created_at) VALUES(?, ?, ?);`,
  INSERT_LIKE: `INSERT INTO
      ${databaseTables.likes}(id, repository_id, created_at) VALUES(?, ?, ?);`,
  INSERT_REPOSITORY: `INSERT INTO
    ${databaseTables.repositories}(id, title, url, created_at) VALUES(?, ?, ?, ?);`,
  INSERT_TECH: `INSERT INTO
    ${databaseTables.techs}(id, repository_id, tech, created_at) VALUES(?, ?, ?, ?);`,
};

export default insertsSqls;
