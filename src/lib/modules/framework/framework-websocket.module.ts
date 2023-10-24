import WebSocket from "ws";
import { logManager } from "../log-manager.module";
import { INTERNAL_CLIENT_OPCODE } from "@/enums/client-opcode.enum";
import { ControllerSearchModule } from "../controller-search.module";
import { frameworkAdapterHandler } from "./framework-adapter-handler.module";
import { Client, SendMessageToSelf } from "@/lib/types/request-controller.type";
import { GameServer } from "../game-server.module";

type WebsocketModule = {
  ws: WebSocket.Server;
  controllerSearch: ControllerSearchModule;
  gameserver: GameServer;
};

const logger = logManager("websocket");

export const frameworkWebsocket = ({
  ws,
  controllerSearch,
  gameserver,
}: WebsocketModule) => {
  ws.on("connection", (ws: WebSocket) => {
    logger.info("New client connected");

    const client: Client = {
      send: (data) => {
        ws.send(JSON.stringify(data));
      },
      sendOpcode: (opcode, data) => {
        ws.send(JSON.stringify([opcode, ...data]));
      },
    };

    const controllerAuth = controllerSearch.getByOpcode(
      INTERNAL_CLIENT_OPCODE.AUTH
    );

    const sendMessageToSelf: SendMessageToSelf = (opcode, data = []) => {
      const controllerToSelf = controllerSearch.getByOpcode(opcode);

      if (controllerToSelf) {
        frameworkAdapterHandler({
          client,
          controller: controllerToSelf,
          data,
          opcode,
          gameserver,
          sendMessageToSelf,
        });
      } else {
        logger.error(`Controller not found for opcode { ${opcode} }`);
        logger.error(`Data: [${data}]`);
      }
    };

    if (controllerAuth) {
      frameworkAdapterHandler({
        client,
        controller: controllerAuth,
        opcode: INTERNAL_CLIENT_OPCODE.AUTH,
        gameserver,
        sendMessageToSelf,
      });
    }

    ws.on("message", (message: string) => {
      const [opcode, ...data] = JSON.parse(message);

      const controller = controllerSearch.getByOpcode(opcode);

      if (controller) {
        frameworkAdapterHandler({
          client,
          controller,
          data,
          opcode,
          gameserver,
          sendMessageToSelf,
        });
      } else {
        logger.error(`Controller not found for opcode { ${opcode} }`);
        logger.error(`Data: [${data}]`);
      }
    });
  });
};
