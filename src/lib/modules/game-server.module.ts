import { HandlerWebsocketModule } from "./framework/framework-adapter-handler.module";

export class GameServer {
  onConnect(request: HandlerWebsocketModule) {
    throw new Error("Method not implemented.");
  }

  onDisconnect(request: HandlerWebsocketModule) {
    throw new Error("Method not implemented.");
  }
}
