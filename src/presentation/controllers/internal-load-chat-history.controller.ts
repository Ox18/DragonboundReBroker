import { config } from "@/config";
import { DragonServer } from "@/dragon-server";
import { INTERNAL_CLIENT_OPCODE } from "@/enums/client-opcode.enum";
import { SERVER_OPCODE } from "@/enums/server-opcode.enum";
import { controller } from "@/lib/modules/controller-manager.module";
import { logManager } from "@/lib/modules/log-manager.module";
import { BugleMessage } from "@/messages/bugle-message";

const logger = logManager("opcode::internal::load-chat-history");

const secrets = config

export default controller()
  .handle<DragonServer>(
    async ({ client, gameserver }) => {
      logger.info(`Client send message`);

      gameserver.chat.getHistoryArray().forEach((chatMessage) => {
        client.sendOpcode(SERVER_OPCODE.CHAT, chatMessage);
      });

      secrets.game.messages.map((message) => {
        client.sendOpcode(SERVER_OPCODE.CHAT, BugleMessage(message));
      })
    }
  )
  .routes([INTERNAL_CLIENT_OPCODE.LOAD_CHAT_HISTORY]);
