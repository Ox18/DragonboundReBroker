import { CHAT_TYPE } from "@/enums/chat-type.enum";
import { Message } from "./message";

export const NormalTeamMessage = (
  message: string,
  nickname: string,
  guildname: string = ""
) => Message(message, CHAT_TYPE.NORMAL_TEAM, nickname, guildname);