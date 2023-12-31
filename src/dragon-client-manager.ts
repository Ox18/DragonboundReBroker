import { DragonClient } from "./dragon-client";

export class ClientManager {
  private clients: DragonClient[] = [];

  constructor() {}

  subscribe(client: DragonClient) {
    this.clients.push(client);
  }

  getByUserID(userId: string): DragonClient | undefined {
    return this.clients.find((client) => client.userId === userId);
  }

  map(callback: (client: DragonClient) => void) {
    this.clients.map(callback);
  }

  getAll(): DragonClient[] {
    return this.clients;
  }

  unsubscribe(userID: string) {
    this.clients = this.clients.filter((client) => client.userId !== userID);
  }
}
