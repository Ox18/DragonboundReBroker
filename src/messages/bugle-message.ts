import { CHAT_TYPE } from "@/enums/chat-type.enum";
import { messageAdapter } from "./message";

export const BugleMessage = (message: string) =>
  messageAdapter({
    message,
    type: CHAT_TYPE.GM_BUGLE,
  });
