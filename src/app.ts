import "reflect-metadata";
import express from "express";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";

import { WeatherbitApi } from "./api-clients/weatherbit.api";

import "./controllers/weather/weather.controller";
import { ArerisApi } from "./api-clients/aeris.api";
import { VisualCrossingApi } from "./api-clients/visual-crossing.api";

export function createApp() {
  const container = new Container();

  container.bind(WeatherbitApi).toSelf();
  container.bind(ArerisApi).toSelf();
  container.bind(VisualCrossingApi).toSelf();

  const server = new InversifyExpressServer(container);

  const app = server.build();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  return app;
}
