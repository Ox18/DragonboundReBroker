import { GuildMember } from "@/domain/models/guild-member.model";
import { Guild } from "@/domain/models/guild.model";
import { ItemEquipped } from "@/domain/models/item-equipped.model";
import { UserEvent } from "@/domain/models/user-event.model";
import { User } from "@/domain/models/user.model";

type Params = {
  userData: User;
  itemEquipped: ItemEquipped;
  guildMember: GuildMember;
  guild: Guild;
  userEvent: UserEvent;
  nameChangesCount: number;
  hasPowerUser: number | boolean;
};

export type IPlayerInfoAdapter = (params: Params) => any[];

export const playerInfoAdapter: IPlayerInfoAdapter = ({
  userData,
  itemEquipped,
  guildMember,
  guild,
  userEvent,
  nameChangesCount,
  hasPowerUser,
}) => {
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

  return Object.values(Player);
};
