import { MainController } from "@/lib/controllers/main.controller";
import { Client } from "@/lib/types/request-controller.type";
import { logManager } from "../log-manager.module";

type HandlerModule = {
  client: Client;
  controller: MainController;
  data?: any;
  opcode: number;
};

const logger = logManager("framework-adapter-handler")

export const frameworkAdapterHandler = async ({
  client,
  controller,
  data = null,
  opcode
}: HandlerModule) => {
  const payload = {
    data,
    client,
  };

  logger.info(`Opcode ${opcode} - data received: `, data);

  try {
    await controller._handle(payload);
  } catch (ex) {
    console.log(ex);
  }
};
