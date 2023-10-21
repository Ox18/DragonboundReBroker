import { CHAT_TYPE } from "@/enums/chat-type.enum";
import { Message } from "./message";

export const DeadMessage = (message: string) => Message(message, CHAT_TYPE.DEAD);