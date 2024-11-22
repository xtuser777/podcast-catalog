import { Podcast } from "../models/podcast";
import { Database } from "../data/database";

export class PodcastsRepository {
  async findMany(name?: string): Promise<Podcast[]> {
    let podcasts: Podcast[] = [];

    try {
      const db = await Database.getInstance().getConnection();
      const result = await db.all<any[]>(
        "SELECT * FROM podcasts WHERE name LIKE ?",
        `%${name}%`
      );
      if (result)
        podcasts = result.map((row: any) => ({
          ...row,
          categories: row.categories.split(", "),
        }));
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao processar a consulta.");
    } finally {
      await Database.getInstance().close();
    }

    return podcasts;
  }

  async findOne(id: string): Promise<Podcast | null> {
    try {
      const db = await Database.getInstance().getConnection();
      const result = await db.get<any>(
        "SELECT * FROM podcasts WHERE id = ?",
        id
      );

      let podcast: Podcast|null = null;

      if (result) {
        podcast = {
          ...result,
          categories: result.categories.split(", "),
        };
      }

      return podcast;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao processar a consulta.");
    } finally {
      await Database.getInstance().close();
    }
  }
}
