import { Router } from "express";
import { WeatherController } from "./weather/weather.controller";

export class MainController {
  getRouter(): Router {
    const router = Router();
    router.use("/weather", new WeatherController().getRouter());
    return router;
  }
}