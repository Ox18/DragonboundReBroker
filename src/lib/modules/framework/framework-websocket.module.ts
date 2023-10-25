import WebSocket from "ws";
import { logManager } from "../log-manager.module";
import { ControllerSearchModule } from "../controller-search.module";
import { frameworkAdapterHandler } from "./framework-adapter-handler.module";
import { GameServer } from "../game-server.module";

const logger = logManager("websocket");

export const frameworkWebsocket = ({
  ws,
  controllerSearch,
  gameserver,
}: {
  ws: WebSocket.Server;
  controllerSearch: ControllerSearchModule;
  gameserver: GameServer;
}) => {
  ws.on("connection", (ws) => {
    logger.info("New client connected");

    let client = {
      user: "",
      send: (data: string) => {
        ws.send(JSON.stringify(data));
      },
      sendOpcode: (opcode, data) => {
        ws.send(JSON.stringify([opcode, ...data]));
      },
      setUser: (user: string) => {
        client.user = user;
      },
    };

    const sendMessageToSelf = (opcode, data = []) => {
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

    const payload = {
      client,
      controller: null,
      opcode: null,
      gameserver,
      sendMessageToSelf,
    };

    gameserver.onConnect(payload);

    ws.on("message", (message: string) => {
      const [opcode, ...data] = JSON.parse(message);

      const controller = controllerSearch.getByOpcode(opcode);

      if (controller) {
        frameworkAdapterHandler({
          client,
          controller,
          opcode,
          data,
          gameserver,
          sendMessageToSelf,
        });
      } else {
        logger.error(`Controller not found for opcode { ${opcode} }`);
        logger.error(`Data: [${data}]`);
      }
    });

    ws.on("close", () => {
      logger.info("Client disconnected");
      gameserver.onDisconnect(payload);
    });
  });
};
