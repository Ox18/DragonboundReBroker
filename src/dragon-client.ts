import { Client } from "./lib/types/request-controller.type";

export class DragonClient {
  ws: Client;
  userId: string;
  rank: number;
  nickname: string;
  guildName: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  set(payload: any) {
    Object.assign(this, payload);
    console.log(this)
  }

  setClient(client: Client) {
    this.ws = client;
  }
}
