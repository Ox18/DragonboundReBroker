import { SERVER_OPCODE } from "@/enums/server-opcode.enum";
import UserRepository from "@/infraestructure/repository/user.repository";
import { Client } from "@/lib/types/request-controller.type";

type RefreshPlayersChannel = {
  client: Client;
};

export const refreshPlayersChannel = async ({
  client,
}: RefreshPlayersChannel) => {
  const users = await UserRepository.getAll();

  const listUsers = users.map((user) => [
    user._id, // USER_INDEX_ID
    user.nickname, // USER_INDEX_NAME
    user.rank, // USER_INDEX_RANK
    "GM", // USER_INDEX_JOB
  ]);

  const listPlayers = listUsers.map((player) => player.join(","));

  client.send([
    SERVER_OPCODE.CHANNEL_PLAYERS,
    listPlayers.join(",").split(","),
  ]);
};
