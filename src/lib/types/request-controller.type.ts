import { GameServer } from "../modules/game-server.module";

export type RequestController<T = GameServer> = {
    data: Array<any> | any;
    client: Client;
    gameserver: T;
    sendMessageToSelf: SendMessageToSelf;
}

export type Client = {
    user: string;
    send: (data: any) => void;
    sendOpcode: (opcode: number, data: any) => void;
    setUser: (user: string) => void;
}

export type SendMessageToSelf = (opcode: number, data?: any) => void;