
import { Server } from "ws";
import serverModel from "../models/server.model";

export class ServerRepository {
  public static async getAll(): Promise<Server[]> {
    const servers = await serverModel.find({});

    return servers
  }
}
