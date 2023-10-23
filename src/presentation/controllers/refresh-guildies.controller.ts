import { CLIENT_OPCODE } from "@/enums/client-opcode.enum";
import { controller } from "@/lib/modules/controller-manager.module";
import { logManager } from "@/lib/modules/log-manager.module";
import { refreshPlayersGuildies } from "@/services/refresh-players-guildies.service";

const logger = logManager("refresh-guildies");

export default controller()
  .handle(async ({ client }) => {
    logger.info(`Refresh guildies`);

    await refreshPlayersGuildies({ client });
  })
  .routes([CLIENT_OPCODE.REFRESH_GUILDIES]);
