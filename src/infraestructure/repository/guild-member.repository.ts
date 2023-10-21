import { GuildMember } from "@/domain/models/guild-member.model";
import serverModel from "../models/server.model";

export class GuildMemberRepository {
  static getByUser(user: string): Promise<GuildMember | null> {
    return serverModel.findOne({ user });
  }

  static async bulk(guildMembers: GuildMember[]): Promise<void> {
    await serverModel.insertMany(guildMembers);
  }
}
