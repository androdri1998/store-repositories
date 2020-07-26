import { databaseTables } from "../utils/configs";
import { IDropsSqls } from "./drops-types";

const dropsSqls: IDropsSqls = {
  DROP_TABLE_MIGRATE_VERSIONS: `
    DROP TABLE ${databaseTables.migrateVersions};
  `,
  DROP_TABLE_REPOSITORIES: `
    DROP TABLE ${databaseTables.repositories};
  `,
  DROP_TABLE_LIKES: `
    DROP TABLE ${databaseTables.likes};
  `,
  DROP_TABLE_TECHS: `
    DROP TABLE ${databaseTables.techs};
  `,
};

export default dropsSqls;
