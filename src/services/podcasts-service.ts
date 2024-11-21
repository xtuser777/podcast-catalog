import { StatusCode } from "../enums/status-code";
import { Podcast } from "../models/podcast";
import { ResponseModel } from "../models/response-model";
import { PodcastsRepository } from "../repositories/podcasts-repository";

export class PodcastsService {
  private readonly podcastsRepository: PodcastsRepository

  constructor() {
    this.podcastsRepository = new PodcastsRepository();
  }
  
  async findMany(
    name: string
  ): Promise<ResponseModel<Podcast[]>> {
    const data: Podcast[] = await this.podcastsRepository.findMany(name);
  
    const statusCode = data.length === 0 ? StatusCode.NO_CONTENT : StatusCode.OK;
  
    return { statusCode, data };
  }
}