import { CLIENT_OPCODE } from "@/enums/client-opcode.enum";
import { SERVER_OPCODE } from "@/enums/server-opcode.enum";
import { TAB_UI } from "@/enums/ui.enum";
import UserRepository from "@/infraestructure/repository/user.repository";
import { controller } from "@/lib/modules/controller-manager.module";
import { logManager } from "@/lib/modules/log-manager.module";

const logger = logManager("tab");

export default controller()
  .handle(async ({ client, data }) => {
    const [tab] = data;

    const keys = Object.keys(TAB_UI).filter((key) => isNaN(Number(key)));

    const tabName = keys[tab];

    logger.info(`Tab changed to >> ${tabName}`);

    const users = await UserRepository.getAll();

    const usersList = users.map((user) => [
      user._id,       // FRIEND_INDEX_ID
      user.nickname,  // FRIEND_INDEX_NAME
      user.gender,    // FRIEND_INDEX_GENDER
      user.rank,      // FRIEND_INDEX_RANK
      user.gp,        // FRIEND_INDEX_GP
      user.photoUrl,  // FRIEND_INDEX_IMAGE
      1,              // FRIEND_INDEX_SERVER
      1,              // FRIEND_INDEX_ROOM
    ]);

    if (tab === TAB_UI.ALL) {
      const usersChannels = users.map((user) => [
        user._id,       // USER_INDEX_ID
        user.nickname,  // USER_INDEX_NAME
        user.rank,      // USER_INDEX_RANK
        "GM"            // USER_INDEX_JOB
      ])
  
      const listPlayers = usersChannels.map((player) => player.join(","));
  
      client.send([SERVER_OPCODE.CHANNEL_PLAYERS, listPlayers.join(",").split(",")]);
    } else if (tab === TAB_UI.FRIENDS) {
      client.send([SERVER_OPCODE.FRIENDS, usersList]);
    } else if (tab === TAB_UI.GUILD) {
    client.send([
      SERVER_OPCODE.GUILD,
      [
        "GM", // GUILD_INDEX_NAME
        0, // GUILD_INDEX JOB 0=member | 1=leader | 2=semileader
        ...usersList,
      ],
    ]);
    }
  })
  .routes([CLIENT_OPCODE.TAB]);
