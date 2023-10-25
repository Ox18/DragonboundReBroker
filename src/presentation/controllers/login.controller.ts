import { playerInfoAdapter } from "@/adapters/player/player-info.adapter";
import { DragonClient } from "@/dragon-client";
import { DragonServer } from "@/dragon-server";
import { AVATARS_EXITEM } from "@/enums/avatars.enum";
import {
  CLIENT_OPCODE,
  INTERNAL_CLIENT_OPCODE,
} from "@/enums/client-opcode.enum";
import { SERVER_OPCODE } from "@/enums/server-opcode.enum";
import { GuildMemberRepository } from "@/infraestructure/repository/guild-member.repository";
import { GuildRepository } from "@/infraestructure/repository/guild.repository";
import { ItemEquippedRepository } from "@/infraestructure/repository/item-equipped.repository";
import { ItemInventoryRepository } from "@/infraestructure/repository/item-inventory.repository";
import { UserEventRepository } from "@/infraestructure/repository/user-event.repository";
import { UserNameChangesRepository } from "@/infraestructure/repository/user-name-changes.repository";
import UserRepository from "@/infraestructure/repository/user.repository";
import { controller } from "@/lib/modules/controller-manager.module";
import { logManager } from "@/lib/modules/log-manager.module";
import { BugleMessage } from "@/messages/bugle-message";

const logger = logManager("opcode::login");

export default controller()
  .handle<DragonServer>(
    async ({ client, data, gameserver, sendMessageToSelf }) => {
      const { clientManager } = gameserver;

      const [version, user, authToken] = data;

      logger.info(`Version: ${version}`);
      logger.info(`User: ${user}`);
      logger.info(`AuthToken: ${authToken}`);

      const userData = await UserRepository.getById(user);

      const itemEquipped = await ItemEquippedRepository.getByUser(user);

      const guildMember = await GuildMemberRepository.getByUser(user);

      const guild = await GuildRepository.getById(guildMember?.guild);

      const userEvent = await UserEventRepository.getByUser(user);

      const nameChangesCount = await UserNameChangesRepository.getCountByUser(
        user
      );

      const hasPowerUser = await ItemInventoryRepository.hasItem(
        AVATARS_EXITEM.POWER_USER
      );

      logger.info({ hasPowerUser });

      const payloadPlayerInfo = playerInfoAdapter({
        userData,
        itemEquipped,
        guildMember,
        guild,
        userEvent,
        nameChangesCount,
        hasPowerUser,
      });

      client.send([SERVER_OPCODE.MY_PLAYER_INFO, payloadPlayerInfo]);
      client.setUser(userData._id);

      // Messages to welcome
      const welcomeMessage = BugleMessage(
        'Welcome to DragonBound 3.3 - <a href="http://www.facebook.com/dragonbound.net" target="_blank">DragonBound Community/News</a>'
      );
      const announcementMessage = BugleMessage(
        'New Avatars: Phoenix & Frozen Warrior Set & Gold Backgrounds & Gold\n Foregrounds | Name Change Fixed | New Cash Charge "GM" Payment Methods.'
      );

      client.sendOpcode(SERVER_OPCODE.CHAT, welcomeMessage);
      client.sendOpcode(SERVER_OPCODE.CHAT, announcementMessage);

      const dragonClient = new DragonClient(userData._id);

      dragonClient.setClient(client);
      dragonClient.set({
        rank: userData.rank,
        nickname: userData.nickname,
        guildName: guild?.name,
      });

      gameserver.clientManager.subscribe(dragonClient);

      const clientFound = clientManager.getByUserID(userData._id);

      console.log({ clientFound });

      sendMessageToSelf(INTERNAL_CLIENT_OPCODE.REFRESH_PLAYERS_CHANNEL);
    }
  )
  .routes([CLIENT_OPCODE.LOGIN]);
