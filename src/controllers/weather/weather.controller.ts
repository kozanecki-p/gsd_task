import { Request, Response, Router } from "express";

export class WeatherController {

  constructor () {
  }

  getRouter = (): Router => {
    const router = Router();
    router.get("/", this.getWeather);
    return router;
  }

  getWeather = async (request: Request, response: Response<{}>) => {

    response
        .status(200)
        .json({})
  }
}