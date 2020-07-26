import { databaseTables } from "../utils/configs";
import { IUpdatesSqls } from "./updates-types";

const updatesSqls: IUpdatesSqls = {
  UPDATE_REPOSITORY: `
    UPDATE ${databaseTables.repositories} SET :sets WHERE id = ?;
  `,
};

export default updatesSqls;
