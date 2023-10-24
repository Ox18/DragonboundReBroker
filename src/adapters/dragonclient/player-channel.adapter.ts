import { DragonClient } from "@/dragon-client";

export const playerChannelAdapter = (dragonClient: DragonClient): any[] => {
  return [
    dragonClient.userId,
    dragonClient.nickname,
    dragonClient.rank,
    dragonClient.guildName,
  ];
};
