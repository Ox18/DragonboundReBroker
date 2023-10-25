import { playerChannelAdapter } from "@/adapters/dragonclient/player-channel.adapter";
import { DragonServer } from "@/dragon-server";
import { INTERNAL_CLIENT_OPCODE } from "@/enums/client-opcode.enum";
import { SERVER_OPCODE } from "@/enums/server-opcode.enum";
import { controller } from "@/lib/modules/controller-manager.module";
import { logManager } from "@/lib/modules/log-manager.module";

const logger = logManager("opcode::refresh-players-channel");

export default controller()
  .handle<DragonServer>(async ({ client, data, gameserver }) => {
    logger.info("update info of list channel players");

    const [onlyMe = false] = data;

    const { clientManager } = gameserver;

    const clients = clientManager.getAll();

    const listUsers = clients
      .map(playerChannelAdapter)
      .map((player) => player.join(","))
      .join(",")
      .split(",");

    const payload = [SERVER_OPCODE.CHANNEL_PLAYERS, listUsers];

    if (onlyMe) {
      return client.send(payload);
    }

    return clients.map((client) => client.ws.send(payload));
  })
  .routes([INTERNAL_CLIENT_OPCODE.REFRESH_PLAYERS_CHANNEL]);
