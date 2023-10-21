import { CHAT_TYPE } from "@/enums/chat-type.enum";
import { messageAdapter } from "./message-adapter";

export const SystemMessage = (message: string) =>
  messageAdapter({
    message,
    type: CHAT_TYPE.SYSTEM,
    enableHTML: false,
  });
