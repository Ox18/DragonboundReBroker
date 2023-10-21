import { CHAT_TYPE } from "@/enums/chat-type.enum";
import { messageAdapter } from "./message-adapter";

export const DeadMessage = (message: string) =>
  messageAdapter({
    message,
    type: CHAT_TYPE.DEAD,
    disabledHTML: false,
  });
