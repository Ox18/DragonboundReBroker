import { ClientManager } from "./dragon-client-manager";
import { GameServer } from "./lib/modules/game-server.module";

export class DragonServer extends GameServer {
  clientManager: ClientManager = new ClientManager();
}
