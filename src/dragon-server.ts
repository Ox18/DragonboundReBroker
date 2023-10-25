import { ClientManager } from "./dragon-client-manager";
import { INTERNAL_CLIENT_OPCODE } from "./enums/client-opcode.enum";
import { HandlerWebsocketModule } from "./lib/modules/framework/framework-adapter-handler.module";
import { GameServer } from "./lib/modules/game-server.module";

export class DragonServer extends GameServer {
  clientManager: ClientManager = new ClientManager();

  onConnect({ sendMessageToSelf }: HandlerWebsocketModule) {
    sendMessageToSelf(INTERNAL_CLIENT_OPCODE.AUTH);
  }

  onDisconnect({ sendMessageToSelf }: HandlerWebsocketModule): void {
    sendMessageToSelf(INTERNAL_CLIENT_OPCODE.DISCONNECT);
  }
}
