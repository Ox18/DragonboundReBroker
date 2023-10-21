import { CHAT_TYPE } from "@/enums/chat-type.enum";
import { messageAdapter } from "./message-adapter";


export const NormalMessage = (
  message: string,
  nickname: string,
  guildname: string = ""
) =>
  messageAdapter({
    message,
    type: CHAT_TYPE.NORMAL,
    nickname,
    guildname,
  });
