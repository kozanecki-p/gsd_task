import { MainController } from "./controllers/main.controller";
import express from "express";

export function createApp() {
  const mainController = new MainController();

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/", mainController.getRouter());
  return app;
}
