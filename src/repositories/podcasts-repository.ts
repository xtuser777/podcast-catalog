import fs from "fs";
import path from "path";
import { Podcast } from "../models/podcast";

const pathData = path.join(__dirname, "../data/podcasts.json");

export class PodcastsRepository {
  async findMany(name?: string): Promise<Podcast[]> {
    const rawData = fs.readFileSync(pathData, "utf-8");
    let jsonFile = JSON.parse(rawData);
  
    if (name) {
      jsonFile = jsonFile.filter((podcast: Podcast) =>
        podcast.podcastName.includes(name)
      );
    }
  
    return jsonFile;
  }
}
