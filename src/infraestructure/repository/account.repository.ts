

import { Account } from "@/domain/models/account.model";
import { AccountImpl } from "../implementation/account.impl";
import accountModel from "../models/account.model";


const accountRepository: AccountImpl = {
  deleteAll: async (): Promise<void> => {
    await accountModel.deleteMany({});
  },
  bulk: async (accounts: any[]): Promise<void> => {
    await accountModel.insertMany(accounts);
  },
  signIn: async (data): Promise<Account | null> => {
    const account = await accountModel.findOne(data);

    if (!account) {
      return null;
    }

    return account;
  },
  getById(id: string): Promise<Account | null> {
    const account = accountModel.findById(id);

    if (!account) {
      return null;
    }

    return account;
  }
};

export default accountRepository;
