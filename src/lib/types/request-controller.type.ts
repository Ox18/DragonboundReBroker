import { GameServer } from "../modules/game-server.module";

export type RequestController<T = GameServer> = {
    data: Array<any> | any;
    client: Client;
    gameserver: T
}

export type Client = {
    send: (data: any) => void;
    sendOpcode: (opcode: number, data: any) => void;
}