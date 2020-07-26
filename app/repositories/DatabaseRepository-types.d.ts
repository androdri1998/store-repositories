/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IDatabaseRepository {
  query: (CONN: any, script: string, values: any[] = []) => Promise<any[]>;
  create: (CONN: any, script: string) => Promise<any[]>;
  truncateTable: (CONN: any, tableName: string) => Promise<any[]>;
  queryTableDatabase: (CONN: any, tableName: string) => Promise<any[]>;
  executeWithDatabase: (func: (CONN: any) => any) => Promise<any>;
  startTransaction: (CONN: any) => Promise<any>;
  commit: (CONN: any) => Promise<any>;
  rollback: (CONN: any) => Promise<any>;
}
