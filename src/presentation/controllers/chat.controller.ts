import { CHAT_TYPE } from "@/enums/chat-type.enum";
import { CLIENT_OPCODE } from "@/enums/client-opcode.enum";
import { SERVER_OPCODE } from "@/enums/server-opcode.enum";
import { controller } from "@/lib/modules/controller-manager.module";
import { logManager } from "@/lib/modules/log-manager.module";
import { NormalMessage } from "@/messages/normal-message";

const logger = logManager("chat");

export default controller()
  .handle(async ({ client, data }) => {
    let [message, locationType] = data;

    const chatsType = Object.values(CHAT_TYPE);

    const nickName = "lnferno";
    const guildName = "GM";

    const normalMessage = NormalMessage(message, nickName, guildName);

    console.log(normalMessage)

    if (!normalMessage.hasErrors()) {
      return client.sendOpcode(SERVER_OPCODE.CHAT, normalMessage.get());
    }
  })
  .routes([CLIENT_OPCODE.CHAT]);
