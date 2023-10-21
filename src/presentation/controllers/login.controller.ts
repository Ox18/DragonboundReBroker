import { CLIENT_OPCODE } from "@/enums/client-opcode.enum";
import { SERVER_OPCODE } from "@/enums/server-opcode.enum";
import { controller } from "@/lib/modules/controller-manager.module";
import { logManager } from "@/lib/modules/log-manager.module";

const logger = logManager("login");

export default controller()
  .handle(async ({ client, data }) => {
    const [version, user, authToken] = data;

    logger.info(`Version: ${version}`);
    logger.info(`User: ${user}`);
    logger.info(`AuthToken: ${authToken}`);

    let Player = {
      user_id: user,        // u
      location_type: 1,     // session
      room_number: 0,       // session
      game_id: 'lnferno',   // u
      rank: 24,             // u
      gp: 12312,            // u
      gold: 12312312,       // u
      cash: 1231232,        // u
      gender: "m",          // u
      unlock: 0,          // unlock-bot
      head: 170,            // item-equipped
      body: 308,            // item-equipped
      eyes: 477,            // item-equipped
      flag: 118,            // item-equipped
      background: 418,      // item-equipped
      foreground: 444,      // item-equipped
      event1: Date.now(),   // event
      event2: Date.now(),   // event
      photo_url: 'https://avatars.githubusercontent.com/u/73305665?v=4', // u
      guild: 'GM',          // guild
      guild_job: 1,         // guild
      name_changes: 1,      // user-name-changes
      power_user: 0,        // items-inventory
      tournament: 1,        // not needed
    };


    
    client.send([SERVER_OPCODE.MY_PLAYER_INFO, Object.values(Player)])
  })
  .routes([CLIENT_OPCODE.LOGIN]);
