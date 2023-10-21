import { CHAT_TYPE } from "@/enums/chat-type.enum";
import { messageAdapter } from "./message-adapter";

export const BugleMessage = (message: string) =>
  messageAdapter({
    message,
    type: CHAT_TYPE.GM_BUGLE,
    disabledHTML: true,
  });
