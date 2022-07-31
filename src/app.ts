import "reflect-metadata";
import express from "express";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";

import { inversifyConfig } from "./inversify.config";

import "./controllers/weather/weather.controller";

export function createApp() {
  const container = new Container();

  inversifyConfig(container);

  const server = new InversifyExpressServer(container);

  const app = server.build();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  return app;
}
