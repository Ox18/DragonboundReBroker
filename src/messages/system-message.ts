import { CHAT_TYPE } from "@/enums/chat-type.enum";
import { messageAdapter } from "./message";

export const SystemMessage = (message: string) =>
  messageAdapter({
    message,
    type: CHAT_TYPE.SYSTEM,
  });
