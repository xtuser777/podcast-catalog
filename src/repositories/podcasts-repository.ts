import path from "path";
import { Podcast } from "../models/podcast";
import { Database } from "../data/database";

const pathData = path.join(__dirname, "/data/podcasts.db");

export class PodcastsRepository {
  async findMany(name?: string): Promise<Podcast[]> {
    let podcasts: Podcast[] = [];
    
    try {
      const db = await Database.getInstance().getConnection();
      const result = await db.all<any[]>(
        "SELECT * FROM podcasts WHERE name LIKE ?",
        `%${name}%`
      );
      if (result) podcasts = result.map((row: any) => ({
        ...row,
        categories: row.categories.split(", "),
      }));
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao processar a consulta.');
    } finally {
      await Database.getInstance().close();
    }

    return podcasts;
  }
}
