import { INTERNAL_CLIENT_OPCODE } from "@/enums/client-opcode.enum";
import { SERVER_OPCODE } from "@/enums/server-opcode.enum";
import { controller } from "@/lib/modules/controller-manager.module";
import { logManager } from "@/lib/modules/log-manager.module";

const logger = logManager("opcode::auth");

export default controller()
  .handle(async ({ client }) => {

    logger.info(`Client connected`);

    client.sendOpcode(SERVER_OPCODE.HI, [
      29, // version
      2, // count player or idont know
      0, // server type
    ]);

    client.sendOpcode(SERVER_OPCODE.LOGIN_PROFILE, [])

    client.sendOpcode(SERVER_OPCODE.LOGIN_AVATARS, [])
  })
  .routes([INTERNAL_CLIENT_OPCODE.AUTH]);
