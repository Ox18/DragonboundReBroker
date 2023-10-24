import { MainController } from "@/lib/controllers/main.controller";
import { Client } from "@/lib/types/request-controller.type";
import { logManager } from "../log-manager.module";
import { GameServer } from "../game-server.module";

type HandlerModule = {
  client: Client;
  controller: MainController;
  data?: any;
  opcode: number;
  gameserver: GameServer;
};

const logger = logManager("framework-adapter-handler");

export const frameworkAdapterHandler = async ({
  client,
  controller,
  data = null,
  opcode,
  gameserver,
}: HandlerModule) => {
  const payload = {
    data,
    client,
    gameserver,
  };

  logger.info(`Opcode ${opcode} - data received: `, data);

  try {
    await controller._handle(payload);
  } catch (ex) {
    console.log(ex);
  }
};
