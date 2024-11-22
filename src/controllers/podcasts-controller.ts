import { IncomingMessage, ServerResponse } from "http";
import { PodcastsService } from "../services/podcasts-service";
import { StatusCode } from "../enums/status-code";

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

  async findOne(
    request: IncomingMessage,
    response: ServerResponse
  ) {
    const param = request.url?.split("/")[3] || "";
  
    const content = await this.podcastsService.findOne(param);
  
    response.writeHead(content.statusCode, {
      "content-type": "application/json",
    });
    response.write(JSON.stringify(content.data));
    return response.end();
  }
}
