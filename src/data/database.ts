import path from "path";
import { open, Database as DatabaseConnection } from "sqlite";
import { Database as DatabaseDriver } from "sqlite3";

export class Database {
  private static instance: Database | null = null;
  private connection: DatabaseConnection | null = null;

  private constructor() {}

  static getInstance(): Database {
    if (this.instance === null) {
      this.instance = new Database();
    }

    return this.instance;
  }

  async getConnection(): Promise<DatabaseConnection> {
    if (this.connection === null) {
      const pathData = path.join(__dirname, "/podcasts.db");
      this.connection = await open({
        filename: pathData,
        driver: DatabaseDriver,
      });
    }

    return this.connection;
  }

  async close(): Promise<void> {
    if (this.connection !== null) {
      await this.connection.close();
      this.connection = null;
    }
  }
}