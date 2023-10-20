import { Response } from "express";
import { RequestController } from "./request-controller.type";

export type RoutesController = string | string[] | number | number[];

export interface HandleController<T = any> {
  (request: RequestController<T>, response: Response): Promise<void> | Promise<any>;
}