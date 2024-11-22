import * as http from "http";
import { PodcastsController } from "./controllers/podcasts-controller";
import { Routes } from "./enums/routes";
import { HttpMethod } from "./enums/http-method";
import { StatusCode } from "./enums/status-code";

export const app = async (
  request: http.IncomingMessage,
  response: http.ServerResponse
) => {
  const baseUrl = request.url?.split("?p=")[0];  

  if (request.method === HttpMethod.GET && baseUrl?.substring(0, 13) === Routes.PODCASTS) {
    const podcastsController = new PodcastsController();
    if (request.url?.split("/").length === 4) {
      return await podcastsController.findOne(request, response);
    }
    await podcastsController.findMany(request, response);
  } else {
    response.writeHead(StatusCode.NOT_FOUND, {
      "content-type": "application/json",
    });
    response.end(JSON.stringify("recurso não encontrado"));
  }
};
