import { HandleController, RoutesController } from "../types/controller.type";

export class MainController<T = any> {
  _routes: RoutesController = [];
  _handle: HandleController<T> | null = null;

  constructor() {}

  routes(routes: RoutesController): MainController<T> {
    this._routes = routes;
    return this;
  }

  handle(handle: HandleController<T>): MainController<T> {
    this._handle = handle;
    return this;
  }
}
