import { Express } from "express";
import { MainController } from "../controllers/main.controller";

export type FrameworkAdapterControllerParams = {
  route: string;
  controller: MainController;
  router: Express;
};
