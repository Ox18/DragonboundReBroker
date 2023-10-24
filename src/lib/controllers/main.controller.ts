import { HandleController, RoutesController } from "../types/controller.type";

export class MainController {
  _routes: RoutesController = [];
  _handle: HandleController<any> | null = null;

  constructor() {}

  routes(routes: RoutesController): MainController {
    this._routes = routes;
    return this;
  }

  handle<T>(handle: HandleController<T>): MainController {
    this._handle = handle;
    return this;
  }

  hasRoute(route: number): boolean {
    const routes = this.getRoutes();

    return routes.includes(route);
  }

  getRoutes(): (string | number)[] {
    return Array.isArray(this._routes) ? this._routes : [this._routes];
  }
}
