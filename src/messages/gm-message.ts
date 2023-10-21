import { CHAT_TYPE } from "@/enums/chat-type.enum";
import { Message } from "./message";

export const GameMasterMessage = (
  message: string,
  nickname: string,
  guildname: string = ""
) => Message(message, CHAT_TYPE.GM, nickname, guildname);
