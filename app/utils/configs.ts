import { IStages, IDatabaseTables } from "./configs-types";

export const stages: IStages = {
  DEV: "dev",
  PROD: "prod",
  TEST: "test",
};

export const databaseTables: IDatabaseTables = {
  migrateVersions: "migrate_versions",
  repositories: "repositories",
  likes: "likes",
  techs: "techs",
};
