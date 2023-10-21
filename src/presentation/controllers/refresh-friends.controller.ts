import { CLIENT_OPCODE } from "@/enums/client-opcode.enum";
import { SERVER_OPCODE } from "@/enums/server-opcode.enum";
import UserRepository from "@/infraestructure/repository/user.repository";
import { controller } from "@/lib/modules/controller-manager.module";
import { logManager } from "@/lib/modules/log-manager.module";

const logger = logManager("refresh-friends");

export default controller()
  .handle(async ({ client }) => {
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

    logger.info(`Sending ${usersList.length} friends to client`);

    client.send([SERVER_OPCODE.FRIENDS, usersList]);
  })
  .routes([CLIENT_OPCODE.REFRESH_FRIENDS]);
