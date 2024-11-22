import { StatusCode } from "../enums/status-code";
import { Podcast } from "../models/podcast";
import { ResponseModel } from "../models/response-model";
import { PodcastsRepository } from "../repositories/podcasts-repository";

export class PodcastsService {
  private readonly podcastsRepository: PodcastsRepository;

  constructor() {
    this.podcastsRepository = new PodcastsRepository();
  }

  async findMany(name: string): Promise<ResponseModel<Podcast[] | string>> {
    try {
      const data: Podcast[] = await this.podcastsRepository.findMany(name);

      const statusCode =
        data.length === 0 ? StatusCode.NO_CONTENT : StatusCode.OK;

      return { statusCode, data };
    } catch (error) {
      return {
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
        data: (error as Error).message,
      };
    }
  }

  async findOne(id: string): Promise<ResponseModel<Podcast | null | string>> {
    try {
      const data: Podcast | null = await this.podcastsRepository.findOne(id);

      const statusCode =
        data ? StatusCode.OK : StatusCode.NOT_FOUND;

      return { statusCode, data };
    } catch (error) {
      return {
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
        data: (error as Error).message,
      };
    }
  }
}
