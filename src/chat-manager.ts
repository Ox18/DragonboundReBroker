import { ChatMessage } from "./chat-message";

export class ChatManager {
  private messages: ChatMessage[] = [];

  constructor() {}

  addMessage(message: ChatMessage) {
    this.messages.push(message);
  }

  getHistoryArray() {
    return this.messages.map((chatMessage: ChatMessage) => [
      chatMessage.message,
      chatMessage.nickname,
      chatMessage.type,
      chatMessage.guildname,
    ]);
  }
}
