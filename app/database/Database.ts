import mysql from "promise-mysql";

import processConsts from "../utils/process-consts";

class Database {
  private host: string | undefined;
  private user: string | undefined;
  private password: string | undefined;
  private database: string | undefined;
  private port: number | undefined;

  constructor() {
    this.host = processConsts.dbHost;
    this.user = processConsts.dbUser;
    this.password = processConsts.dbPass;
    this.database = processConsts.dbName;
    this.port = Number(processConsts.dbPort);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getConnection(): Promise<any> {
    const connection = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
      port: this.port,
    });

    return connection;
  }
}

export default Database;
