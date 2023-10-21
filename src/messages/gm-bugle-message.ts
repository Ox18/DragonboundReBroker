import { CHAT_TYPE } from "@/enums/chat-type.enum";
import { Message } from "./message";

export const GameMasterBugleMessage = (
  message: string,
  nickname: string,
  guildname: string = ""
) => Message(message, CHAT_TYPE.GM_BUGLE, nickname, guildname);
