import { CHAT_TYPE } from "./enums/chat-type.enum";

export class ChatMessage {
  type: CHAT_TYPE;
  message: string;
  user: string;
  date: Date = new Date();
  nickname: string;
  guildname: string;

  constructor(
    user: string,
    message: string,
    type: CHAT_TYPE,
    nickname: string,
    guildname: string
  ) {
    this.user = user;
    this.message = message;
    this.type = type;
    this.nickname = nickname;
    this.guildname = guildname;
  }
}
