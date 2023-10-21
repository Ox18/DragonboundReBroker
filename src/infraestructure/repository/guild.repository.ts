import { Guild } from "@/domain/models/guild.model";
import guildModel from "../models/guild.model";

export class GuildRepository {
  static getById(id: string): Promise<Guild | null> {
    return guildModel.findById(id);
  }
}
