import { CHAT_TYPE } from "@/enums/chat-type.enum";
import { messageAdapter } from "./message-adapter";

export const GameMasterMessage = (
  message: string,
  nickname: string,
  guildname: string = ""
) =>
  messageAdapter({
    message,
    type: CHAT_TYPE.GM,
    nickname,
    guildname,
  });
