import { configHealth } from "./modules/config-health.module";
import { Framework } from "./modules/framework/framework.module";
import { GameServer } from "./modules/game-server.module";
import { loadControllers } from "./modules/load-controllers.module";

export const application = async (dir: string, gameserver: GameServer): Promise<void> => {
  const config = configHealth();

  const controllers = await loadControllers(dir);
  
  const port = process.env.PORT || config.service.port;

  const framework = new Framework(port as number);
  framework.loadGameServer(gameserver);
  framework.loadControllers(controllers);
  framework.initialize();
  framework.start();
};
