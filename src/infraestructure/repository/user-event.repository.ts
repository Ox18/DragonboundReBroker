import { UserEvent } from "@/domain/models/user-event.model";
import userEventModel from "../models/user-event.model";

export class UserEventRepository {
  static getByUser(user: string): Promise<UserEvent | null> {
    return userEventModel.findOne({ user });
  }
}
