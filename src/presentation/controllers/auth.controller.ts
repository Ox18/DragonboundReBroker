import { SERVER_OPCODE } from "@/enums/server-opcode.enum";
import accountRepository from "@/infraestructure/repository/account.repository";
import userRepository from "@/infraestructure/repository/user.repository";
import { controller } from "@/lib/modules/controller-manager.module";

type CreateUser = {
  username: string;
  password: string;
};

export default controller<CreateUser>()
  .handle(async (req, res) => {
    
  })
  .routes([
    SERVER_OPCODE.HI
  ]);
