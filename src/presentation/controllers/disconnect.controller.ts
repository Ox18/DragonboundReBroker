import { DragonServer } from "@/dragon-server";
import { INTERNAL_CLIENT_OPCODE } from "@/enums/client-opcode.enum";
import { controller } from "@/lib/modules/controller-manager.module";
import { logManager } from "@/lib/modules/log-manager.module";

const logger = logManager("opcode::disconnect");

export default controller()
  .handle<DragonServer>(async ({ client, gameserver, sendMessageToSelf }) => {
    logger.info(`Client disconnected >> ${client.user}`);
    const { clientManager } = gameserver;

    clientManager.unsubscribe(client.user);
    sendMessageToSelf(INTERNAL_CLIENT_OPCODE.REFRESH_PLAYERS_CHANNEL);
  })
  .routes([INTERNAL_CLIENT_OPCODE.DISCONNECT]);
