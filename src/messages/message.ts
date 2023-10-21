import { CHAT_TYPE } from "@/enums/chat-type.enum";

export const Message = (
  message: string,
  type: CHAT_TYPE = CHAT_TYPE.SYSTEM,
  nickname: string = '',
  guildname: string = ''
) => {
  return [message, nickname, type, guildname]
};
