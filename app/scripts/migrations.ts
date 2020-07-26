import createsSqls from "../sqls/creates";
import dropsSqls from "../sqls/drops";
import { databaseTables } from "../utils/configs";

const migrations = [
  {
    version: "1014ad50-fb90-43a0-a5d2-8901524b010d",
    up: [
      {
        script: createsSqls.CREATE_TABLE_MIGRATE_VERSIONS,
        description: `Create table ${databaseTables.migrateVersions}.`,
      },
    ],
    down: [
      {
        script: dropsSqls.DROP_TABLE_MIGRATE_VERSIONS,
        description: `Drop table ${databaseTables.migrateVersions}.`,
      },
    ],
  },
  {
    version: "1d7d04a2-c1ec-4e12-a72d-bdd12d1f7a25",
    up: [
      {
        script: createsSqls.CREATE_TABLE_REPOSITORIES,
        description: `Create table ${databaseTables.repositories}.`,
      },
    ],
    down: [
      {
        script: dropsSqls.DROP_TABLE_REPOSITORIES,
        description: `Drop table ${databaseTables.repositories}.`,
      },
    ],
  },
  {
    version: "8c14c388-6765-4fa5-82f7-df47a05344b1",
    up: [
      {
        script: createsSqls.CREATE_TABLE_LIKES,
        description: `Create table ${databaseTables.likes}.`,
      },
    ],
    down: [
      {
        script: dropsSqls.DROP_TABLE_LIKES,
        description: `Drop table ${databaseTables.likes}.`,
      },
    ],
  },
  {
    version: "c5bef2f7-5d11-4554-8d07-1be0a5a54175",
    up: [
      {
        script: createsSqls.CREATE_TABLE_TECHS,
        description: `Create table ${databaseTables.techs}.`,
      },
    ],
    down: [
      {
        script: dropsSqls.DROP_TABLE_TECHS,
        description: `Drop table ${databaseTables.techs}.`,
      },
    ],
  },
];

export default migrations;
