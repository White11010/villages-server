import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
export declare class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    users: number;
    handleConnection(): Promise<void>;
    handleDisconnect(arg: any): Promise<void>;
    handleJoinRoom(client: Socket, data: any): Promise<void>;
    handleLeaveRoom(client: Socket, data: any): Promise<void>;
}
