import { UserUnlock } from "@/domain/models/user-unlock.model";
import userUnlockModel from "../models/user-unlock.model";

export class UserUnlockRepository {
  static getByUser(user: string): Promise<UserUnlock | null> {
    return userUnlockModel.findOne({ user });
  }
}
