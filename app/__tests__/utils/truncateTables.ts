import dotenv from "dotenv";
import Helpers from "../../utils/Helpers";
const HelpersInstance = new Helpers();
dotenv.config({
  path: HelpersInstance.getPathEnv(process.env.NODE_ENV as string),
});

import DatabaseRepository from "../../repositories/DatabaseRepository";

export default async (tables: string[] = []): Promise<boolean> => {
  const DatabaseRepositoryInstance = new DatabaseRepository();
  await DatabaseRepositoryInstance.executeWithDatabase(async (CONN) => {
    for (const table of tables) {
      await DatabaseRepositoryInstance.truncateTable(CONN, table);
    }

    return true;
  });
  return true;
};
