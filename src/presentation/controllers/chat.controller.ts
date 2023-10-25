import { filteredWordsList } from "@/consts/filtered-words.const";
import { CLIENT_OPCODE } from "@/enums/client-opcode.enum";
import { SERVER_OPCODE } from "@/enums/server-opcode.enum";
import { controller } from "@/lib/modules/controller-manager.module";
import { logManager } from "@/lib/modules/log-manager.module";
import { NormalMessage } from "@/messages/normal-message";
import { cleanText, removeHTMLTags } from "@/utils/text.util";

const logger = logManager("opcode::chat");

export default controller()
  .handle(async ({ client, data }) => {

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

    const nickName = "lnferno";
    const guildName = "GM";

    const normalMessage = NormalMessage(message, nickName, guildName);

    client.sendOpcode(SERVER_OPCODE.CHAT, normalMessage);
  })
  .routes([CLIENT_OPCODE.CHAT]);
