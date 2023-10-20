import { MainController } from "@/lib/controllers/main.controller";
import { controller } from "../controller-manager.module";

export const frameworkHealthRoutes = (controllers: MainController[]): any => {

  const data = []

  controllers.forEach((controller: MainController) => {
    data.push(...controller._routes as string[])
  })

  return data.map((route: string) => ({ route }))
}