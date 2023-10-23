import { CLIENT_OPCODE } from "@/enums/client-opcode.enum";
import { controller } from "@/lib/modules/controller-manager.module";
import { logManager } from "@/lib/modules/log-manager.module";
import { refreshPlayersFriends } from "@/services/refresh-players-friends.service";

const logger = logManager("refresh-friends");

export default controller()
  .handle(async ({ client }) => {
    logger.info(`Refresh friends`);

    await refreshPlayersFriends({ client });
  })
  .routes([CLIENT_OPCODE.REFRESH_FRIENDS]);
