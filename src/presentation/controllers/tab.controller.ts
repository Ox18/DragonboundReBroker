import {
  CLIENT_OPCODE,
  INTERNAL_CLIENT_OPCODE,
} from "@/enums/client-opcode.enum";
import { TAB_UI } from "@/enums/ui.enum";
import { controller } from "@/lib/modules/controller-manager.module";
import { logManager } from "@/lib/modules/log-manager.module";
import { refreshPlayersFriends } from "@/services/refresh-players-friends.service";
import { refreshPlayersGuildies } from "@/services/refresh-players-guildies.service";

const logger = logManager("tab");

export default controller()
  .handle(async ({ client, data, sendMessageToSelf }) => {
    const [tab] = data;

    const keys = Object.keys(TAB_UI).filter((key) => isNaN(Number(key)));

    const tabName = keys[tab];

    logger.info(`Tab changed to >> ${tabName}`);

    if (tab === TAB_UI.ALL) {
      sendMessageToSelf(INTERNAL_CLIENT_OPCODE.REFRESH_PLAYERS_CHANNEL, [true]);
    } else if (tab === TAB_UI.FRIENDS) {
      await refreshPlayersFriends({ client });
    } else if (tab === TAB_UI.GUILD) {
      await refreshPlayersGuildies({ client });
    }
  })
  .routes([CLIENT_OPCODE.TAB]);
