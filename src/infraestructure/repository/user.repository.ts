
import { UserRepositoryImpl } from "../implementation/user.impl";
import { User } from "@/domain/models/user.model";
import userModel from "../models/user.model";

export const userRepository: UserRepositoryImpl = {
  deleteAll: async (): Promise<void> => {
    await userModel.deleteMany({});
  },

  bulk: async (users: any[]): Promise<void> => {
    await userModel.insertMany(users);
  },

  getByAccount: async (account: string | null): Promise<User | null> => {
    if (!account) {
      return null;
    }

    const user = await userModel.findOne({ account });

    if (!user) {
      return null;
    }

    return user;
  },

  getTotal: async (): Promise<number> => {
    return await userModel.countDocuments({});
  }
};

export default userRepository;