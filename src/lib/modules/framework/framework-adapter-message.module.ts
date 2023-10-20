import { MainController } from "@/lib/controllers/main.controller";

export const frameworkAdapterMessage = async (client: WebSocket, controller: MainController) => {
  console.log('llego a adapter')
}