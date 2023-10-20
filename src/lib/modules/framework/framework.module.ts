import WebSocket from "ws";
import http from "http";
import express, { Express } from "express";
import { MainController } from "../../controllers/main.controller";
import { logManager } from "../log-manager.module";
import { frameworkHealthRoutes } from "./framework-health-routes.module";

const logger = logManager("application");

export class Framework {
  app: Express;
  server: http.Server;
  ws: any;
  controllers: MainController[];

  constructor(private readonly port: number) {
    this.app = express();
    this.server = http.createServer(this.app);
    this.ws = new WebSocket.Server({ server: this.server });
  }

  initialize(dir: string): void {
    this.ws.on("connection", (ws: WebSocket) => {
      logger.info("New client connected");

      // login or hi
      ws.send(JSON.stringify([9,
        29, // version
        2,  // count player or idont know
        3   // server type
      ]));
      // login_profile: 26,

      ws.send(JSON.stringify([26, []]))

      // login_avatars: 27,
      ws.send(JSON.stringify([27, []]))

      ws.on("message", (message: string) => {
        logger.info(`Received message => ${message}`);

        ws.send(JSON.stringify([1, [1,123,123,123,123,12,1]]))
      });
    })

    // create route
    this.app.get("/health", (req, res) => {
      res.json(frameworkHealthRoutes(this.controllers));
    });
  }

  loadControllers(controllers: MainController[]) {
    this.controllers = controllers;
  }

  start(): void {
    this.server.listen(this.port, () => {
      logger.info(`Server started at http://localhost:${this.port}`);
    });

  }
}
