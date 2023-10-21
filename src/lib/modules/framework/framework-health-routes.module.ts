import { MainController } from "@/lib/controllers/main.controller";
import { Express } from "express";

export const frameworkHealthRoutes = (
  app: Express,
  controllers: MainController[]
): any => {
  const data = [];

  controllers.forEach((controller: MainController) => {
    if (controller?._routes) {
      data.push(...(controller._routes as string[]));
    }
  });

  const routes = data.map((route: string) => ({ route }));

  app.get("/health", (req, res) => {
    res.json({
      status: "UP",
      routes,
    });
  });
};
