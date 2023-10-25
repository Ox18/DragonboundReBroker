import { ChatMessage } from "@/chat-message";
import { filteredWordsList } from "@/consts/filtered-words.const";
import { DragonServer } from "@/dragon-server";
import { CLIENT_OPCODE } from "@/enums/client-opcode.enum";
import { SERVER_OPCODE } from "@/enums/server-opcode.enum";
import { controller } from "@/lib/modules/controller-manager.module";
import { logManager } from "@/lib/modules/log-manager.module";
import { GameMasterMessage } from "@/messages/gm-message";
import { NormalMessage } from "@/messages/normal-message";
import { cleanText, removeHTMLTags } from "@/utils/text.util";

const logger = logManager("opcode::chat");

export default controller()
  .handle<DragonServer>(async ({ client, data, gameserver }) => {
    logger.info(`Client send message`);

    const [message, locationType] = data;

    let cleanedMessage = message;

    cleanedMessage = cleanText(cleanedMessage);

    filteredWordsList.forEach((badWord) => {
      cleanedMessage = cleanedMessage.replace(badWord, "****");
    });

    cleanedMessage = removeHTMLTags(cleanedMessage);

    if (cleanedMessage.length <= 0) {
      return;
    }

    const myDragonClient = gameserver.clientManager.getByUserID(client.user);

    if (!myDragonClient) return;

    const payloadMessageClient: [string, string, string] = [
      message,
      myDragonClient.nickname,
      myDragonClient.guildName,
    ];

    const messageClient = myDragonClient.gm
      ? GameMasterMessage(...payloadMessageClient)
      : NormalMessage(...payloadMessageClient);

    gameserver.clientManager.getAll().forEach((dragonClient) => {
      dragonClient.ws.sendOpcode(SERVER_OPCODE.CHAT, messageClient);
    });

    const chatMessage = new ChatMessage(
      client.user,
      cleanedMessage,
      messageClient[1],
      myDragonClient.nickname,
      myDragonClient.guildName
    );

    gameserver.chat.addMessage(chatMessage);
  })
  .routes([CLIENT_OPCODE.CHAT]);
