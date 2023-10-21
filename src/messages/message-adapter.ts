import { CHAT_TYPE } from "@/enums/chat-type.enum";
import { Message } from "./message";

type MessageParams = {
  message: string;
  type: CHAT_TYPE;
  nickname?: string;
  guildname?: string;
  enableHTML?: boolean;
};

export const messageAdapter = ({
  message,
  type,
  nickname = "",
  guildname = "",
  enableHTML = true,
}: MessageParams) => {
  return new Message(message, type, nickname, guildname, enableHTML);
};
