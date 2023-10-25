import { CHAT_TYPE } from "@/enums/chat-type.enum";

type MessageParams = {
  message: string;
  type: CHAT_TYPE;
  nickname?: string;
  guildname?: string;
};

export const messageAdapter = ({
  message,
  type,
  nickname = "",
  guildname = "",
}: MessageParams): any[] => {
  return [message, nickname, type, guildname];
};
