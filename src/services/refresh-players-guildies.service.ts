import { SERVER_OPCODE } from "@/enums/server-opcode.enum";
import UserRepository from "@/infraestructure/repository/user.repository";
import { Client } from "@/lib/types/request-controller.type";

type RefreshPlayersGuildies = {
  client: Client;
};

export const refreshPlayersGuildies = async ({
  client,
}: RefreshPlayersGuildies) => {
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

    client.send([
      SERVER_OPCODE.GUILD,
      [
        "GM", // GUILD_INDEX_NAME
        0, // GUILD_INDEX JOB 0=member | 1=leader | 2=semileader
        ...usersList,
      ],
    ]);
};
