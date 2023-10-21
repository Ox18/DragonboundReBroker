import { AVATARS_EXITEM } from "@/enums/avatars.enum";
import { CHAT_TYPE } from "@/enums/chat-type.enum";
import { CLIENT_OPCODE } from "@/enums/client-opcode.enum";
import { SERVER_OPCODE } from "@/enums/server-opcode.enum";
import { controller } from "@/lib/modules/controller-manager.module";
import { logManager } from "@/lib/modules/log-manager.module";
import { BugleMessage } from "@/messages/bugle-message";
import { DeadMessage } from "@/messages/dead-message";
import { GameMasterBugleMessage } from "@/messages/gm-bugle-message";
import { GameMasterMessage } from "@/messages/gm-message";
import { GoldMessage } from "@/messages/gold-message";
import { NormalMessage } from "@/messages/normal-message";
import { SystemMessage } from "@/messages/system-message";

const logger = logManager("chat");

export default controller()
  .handle(async ({ client, data }) => {
    const [message, locationType] = data;

    const chatsType = Object.values(CHAT_TYPE);

    const nickName = "lnferno";
    const guildName = "GM";

    // const deadMessage = DeadMessage("Hi, I'm a dead message");
    // client.sendOpcode(SERVER_OPCODE.CHAT, deadMessage);

    const messages = [];

    messages.push(NormalMessage(message, nickName, guildName));

    messages.forEach((message) => {
      client.sendOpcode(SERVER_OPCODE.CHAT, message);
    });
  })
  .routes([CLIENT_OPCODE.CHAT]);
