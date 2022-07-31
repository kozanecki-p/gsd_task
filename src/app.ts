import "reflect-metadata";
import express from "express";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";

import { WeatherbitApi } from "./api-clients/weaterbit/weatherbit.api";
import { ArerisApi } from "./api-clients/aeris/aeris.api";
import { VisualCrossingApi } from "./api-clients/visual-crossing/visual-crossing.api";

import { GetWeaterbitForecast } from "./services/weater/GetWeatherbitForecast/GetWeaterbitForecast.service";
import { GetAerisForecast } from "./services/weater/GetAerisForecast/GetAerisForecast.service";
import { GetVisualCrossingForecast } from "./services/weater/GetVisualCrossingForecast/GetVisualCrossingForecast.service";

import "./controllers/weather/weather.controller";

export function createApp() {
  const container = new Container();

  container.bind(WeatherbitApi).toSelf();
  container.bind(ArerisApi).toSelf();
  container.bind(VisualCrossingApi).toSelf();

  container.bind(GetWeaterbitForecast).toSelf();
  container.bind(GetAerisForecast).toSelf();
  container.bind(GetVisualCrossingForecast).toSelf();

  const server = new InversifyExpressServer(container);

  const app = server.build();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  return app;
}
