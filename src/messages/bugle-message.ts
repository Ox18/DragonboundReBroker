import { CHAT_TYPE } from "@/enums/chat-type.enum";
import { Message } from "./message";

export const BugleMessage = (message: string) =>
  Message(message, CHAT_TYPE.GM_BUGLE);
