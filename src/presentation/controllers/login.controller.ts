import { CLIENT_OPCODE } from "@/enums/client-opcode.enum";
import { SERVER_OPCODE } from "@/enums/server-opcode.enum";
import { controller } from "@/lib/modules/controller-manager.module";
import { logManager } from "@/lib/modules/log-manager.module";

const logger = logManager("login");

export default controller()
  .handle(async ({ client, data }) => {
  
    const [version, user, authToken] = data;

    logger.info(`Version: ${version}`);
    logger.info(`User: ${user}`);
    logger.info(`AuthToken: ${authToken}`);

    client.sendOpcode(
      SERVER_OPCODE.MY_PLAYER_INFO,
      [1, 123, 123, 123, 123, 12, 1]
    );
  })
  .routes([CLIENT_OPCODE.LOGIN]);
