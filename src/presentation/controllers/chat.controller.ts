import { filteredWordsList } from "@/consts/filtered-words.const";
import { CHAT_TYPE } from "@/enums/chat-type.enum";
import { CLIENT_OPCODE } from "@/enums/client-opcode.enum";
import { SERVER_OPCODE } from "@/enums/server-opcode.enum";
import { controller } from "@/lib/modules/controller-manager.module";
import { logManager } from "@/lib/modules/log-manager.module";
import { NormalMessage } from "@/messages/normal-message";
import { cleanText, removeHTMLTags } from "@/utils/text.util";

const logger = logManager("chat");

export default controller()
  .handle(async ({ client, data }) => {
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

    // const chatsType = Object.values(CHAT_TYPE);

    // const normalMessage = NormalMessage(message, nickName, guildName);

    // console.log(normalMessage)

    // if (!normalMessage.hasErrors()) {
    //   return client.sendOpcode(SERVER_OPCODE.CHAT, normalMessage.get());
    // }
  })
  .routes([CLIENT_OPCODE.CHAT]);
