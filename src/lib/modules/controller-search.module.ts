import { MainController } from "../controllers/main.controller";

export type ControllerSearchModule = {
  getByOpcode: (opcode: number) => MainController;
};

export const controllerSearch = (
  controllers: MainController[]
): ControllerSearchModule => ({
  getByOpcode: (opcode: number) => {
    return controllers.find((controller: MainController) =>
      controller.hasRoute(opcode)
    );
  },
});
