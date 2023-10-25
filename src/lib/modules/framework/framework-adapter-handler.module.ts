import { MainController } from "@/lib/controllers/main.controller";
import { Client, SendMessageToSelf } from "@/lib/types/request-controller.type";
import { logManager } from "../log-manager.module";
import { GameServer } from "../game-server.module";

export type HandlerWebsocketModule = {
  client: Client;
  controller: MainController;
  data?: any;
  opcode: number;
  gameserver: GameServer;
  sendMessageToSelf: SendMessageToSelf;
};

const logger = logManager("framework-adapter-handler");

export const frameworkAdapterHandler = async ({
  client,
  controller,
  data = null,
  opcode,
  gameserver,
  sendMessageToSelf,
}: HandlerWebsocketModule) => {
  const payload = {
    data,
    client,
    gameserver,
    sendMessageToSelf,
  };

  logger.info(`Opcode ${opcode} - data received: `, data);

  try {
    await controller._handle(payload);
  } catch (ex) {
    console.log(ex);
  }
};
