import { databaseTables } from "../utils/configs";
import { ICreatesSqls } from "./creates-types";

const createSqls: ICreatesSqls = {
  CREATE_TABLE_MIGRATE_VERSIONS: `
    CREATE TABLE ${databaseTables.migrateVersions}(
      id VARCHAR(36) PRIMARY KEY,
      version VARCHAR(36) NOT NULL,
      created_at DATETIME NOT NULL
    );
  `,
  CREATE_TABLE_REPOSITORIES: `
    CREATE TABLE ${databaseTables.repositories}(
      id VARCHAR(36) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      url VARCHAR(255) NOT NULL,
      created_at DATETIME NOT NULL
    );
  `,
  CREATE_TABLE_LIKES: `
    CREATE TABLE ${databaseTables.likes}(
      id VARCHAR(36) PRIMARY KEY,
      repository_id VARCHAR(36) NOT NULL,
      created_at DATETIME NOT NULL
    );
  `,
  CREATE_TABLE_TECHS: `
    CREATE TABLE ${databaseTables.techs}(
      id VARCHAR(36) PRIMARY KEY,
      repository_id VARCHAR(36) NOT NULL,
      tech VARCHAR(255) NOT NULL,
      created_at DATETIME NOT NULL
    );
  `,
};

export default createSqls;
