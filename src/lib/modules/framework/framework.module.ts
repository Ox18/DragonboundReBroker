import WebSocket from "ws";
import http from "http";
import express, { Express } from "express";
import { MainController } from "../../controllers/main.controller";
import { logManager } from "../log-manager.module";
import { frameworkHealthRoutes } from "./framework-health-routes.module";
import { frameworkWebsocket } from "./framework-websocket.module";
import { controllerSearch } from "../controller-search.module";
import { GameServer } from "../game-server.module";

const logger = logManager("application");
export class Framework {
  app: Express;
  server: http.Server;
  ws: WebSocket.Server;
  controllers: MainController[];
  gameserver: GameServer;

  constructor(private readonly port: number) {
    this.app = express();
    // this.server = http.createServer(this.app);
    this.ws = new WebSocket.Server({ port });
  }

  initialize(): void {
    frameworkWebsocket({
      ws: this.ws,
      controllerSearch: controllerSearch(this.controllers),
      gameserver: this.gameserver,
    });
    frameworkHealthRoutes(this.app, this.controllers);
  }

  loadControllers(controllers: MainController[]) {
    this.controllers = controllers;
  }

  start(): void {
    // this.server.listen(this.port, () => {
    //   logger.info(`Server started at ws://localhost:${this.port}`);
    // });
  }

  getControllerByOpcode(opcode: number): MainController {
    const controller = this.controllers.find((controller) =>
      controller.hasRoute(opcode)
    );

    if (!controller) {
      logger.error(`Controller not found for opcode [${opcode}]`);
    }

    return controller;
  }

  loadGameServer(gameserver: GameServer): void {
    this.gameserver = gameserver;
  }
}
