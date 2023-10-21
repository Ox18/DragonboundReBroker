export type RequestController<T> = {
    data: T;
    client: Client;
}

export type Client = {
    send: (data: any) => void;
    sendOpcode: (opcode: number, data: any) => void;
}