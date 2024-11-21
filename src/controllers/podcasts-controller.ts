import { IncomingMessage, ServerResponse } from "http";
import { PodcastsService } from "../services/podcasts-service";

export class PodcastsController {
  private readonly podcastsService: PodcastsService;

  constructor() {
    this.podcastsService = new PodcastsService();
  }

  async findMany(
    request: IncomingMessage,
    response: ServerResponse
  ) {
    const param = request.url?.split("?p=")[1] || "";
  
    const content = await this.podcastsService.findMany(param);
  
    response.writeHead(content.statusCode, {
      "content-type": "application/json",
    });
    response.write(JSON.stringify(content.data));
    response.end();
  }
}
