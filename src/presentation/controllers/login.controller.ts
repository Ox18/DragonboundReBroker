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

    // user_id: 0,
    //     location_type: 1,
    //     room_number: 2,
    //     game_id: 3,
    //     rank: 4,
    //     gp: 5,
    //     gold: 6,
    //     cash: 7,
    //     gender: 8,
    //     unlock: 9,
    //     head: 10,
    //     body: 11,
    //     eyes: 12,
    //     flag: 13,
    //     background: 14,
    //     foreground: 15,
    //     event1: 16,
    //     event2: 17,
    //     fb: 18,
    //     guild: 19,
    //     guild_job: 20,
    //     name_changes: 21,
    //     power_user: 22,
    //     tournament: 23

    let Player = {
      user_id: user, // user
      location_type: 1, // temporal
      room_number: 0, // temporal
      game_id: 'lnferno', // user
      rank: 24, // user
      gp: 12312, // U
      gold: 12312312, // U
      cash: 1231232, // U
      gender: "m", // user
      unlock: 100, // events
      head: 170, // ae
      body: 308, // ae
      eyes: 477, // ae
      flag: 118, // ae
      background: 418, // ae
      foreground: 444, // ae
      event1: Date.now(), // e
      event2: Date.now(), // e
      photo_url: 'https://avatars.githubusercontent.com/u/73305665?v=4', // U
      guild: 'GM', // guild
      guild_job: 1, // guild_relation
      name_changes: 1, // U
      power_user: 0, // items
      tournament: 1, // Tournament
      plus10gp: 1, // Items
      mobile_fox: 1, // Items
      country: user.country, // U
      relationship_status: "m", // Relation
      relationship_with_id: 1, // R
      relationship_with_rank: 27, // R
      relationship_with_photo:
        "https://avatars.githubusercontent.com/u/73305665?v=4", // R
      relationship_with_name: "Alex", // R
      relationship_with_gender: "m", // R
      maps_pack: 1, // Items
      prix_points: 100, // Tournament
      megaphones: 1000, // Items
      lucky_egg_sec_left: Date.now() + 1000, // Items
      prix_points_type: 2, // Tournament
      prix_points_reset_price: 1, // Tournament
    };


    
    client.send([SERVER_OPCODE.MY_PLAYER_INFO, Object.values(Player)])
  })
  .routes([CLIENT_OPCODE.LOGIN]);
