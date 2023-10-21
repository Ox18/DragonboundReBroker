import { AVATARS_EXITEM } from "@/enums/avatars.enum";
import { CLIENT_OPCODE } from "@/enums/client-opcode.enum";
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

const logger = logManager("login");

export default controller()
  .handle(async ({ client, data }) => {
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

    const Player = {
      user_id: userData._id,
      location_type: 1,
      room_number: 0,
      game_id: userData.nickname,
      rank: userData.rank,
      gp: userData.gp,
      gold: userData.gold,
      cash: userData.cash,
      gender: userData.gender,
      unlock: 0, // unlock-bot
      head: itemEquipped.head, // item-equipped
      body: itemEquipped.body, // item-equipped
      eyes: itemEquipped.eyes, // item-equipped
      flag: itemEquipped.flag, // item-equipped
      background: itemEquipped.background, // item-equipped
      foreground: itemEquipped.foreground, // item-equipped
      event1: userEvent?.events.facebook.leftTime, // event
      event2: userEvent?.events.hourly.leftTime, // event
      photo_url: userData.photoUrl, // u
      guild: guild?.name, // guild
      guild_job: guildMember?.job, // guild
      name_changes: nameChangesCount, // user-name-changes
      power_user: hasPowerUser, // items-inventory
      tournament: null, // not needed
    };

    client.send([SERVER_OPCODE.MY_PLAYER_INFO, Object.values(Player)]);

    // Messages to welcome
    const welcomeMessage = BugleMessage(
      'Welcome to DragonBound 3.3 - <a href="http://www.facebook.com/dragonbound.net" target="_blank">DragonBound Community/News</a>'
    );
    const announcementMessage = BugleMessage(
      'New Avatars: Phoenix & Frozen Warrior Set & Gold Backgrounds & Gold\n Foregrounds | Name Change Fixed | New Cash Charge "GM" Payment Methods.'
    );

    client.sendOpcode(SERVER_OPCODE.CHAT, welcomeMessage);
    client.sendOpcode(SERVER_OPCODE.CHAT, announcementMessage);
  })
  .routes([CLIENT_OPCODE.LOGIN]);
