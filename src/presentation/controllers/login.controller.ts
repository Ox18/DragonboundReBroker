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
      location_type: 1,     // 
      room_number: 0,       // 
      game_id: 'lnferno',   // u
      rank: 24,             // u
      gp: 12312,            // u
      gold: 12312312,       // u
      cash: 1231232,        // u
      gender: "m",          // u
      unlock: 100,          //
      head: 170,            //
      body: 308,            //
      eyes: 477,            //
      flag: 118,            //
      background: 418,      // 
      foreground: 444,      // 
      event1: Date.now(),   //
      event2: Date.now(),   //
      photo_url: 'https://avatars.githubusercontent.com/u/73305665?v=4', // u
      guild: 'GM',          //
      guild_job: 1,         //
      name_changes: 1,      //
      power_user: 0,        //
      tournament: 1,        //
    };


    
    client.send([SERVER_OPCODE.MY_PLAYER_INFO, Object.values(Player)])
  })
  .routes([CLIENT_OPCODE.LOGIN]);
