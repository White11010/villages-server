import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";

@WebSocketGateway({ cors: true })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  users: number = 0;

  async handleConnection() {}

  async handleDisconnect() {}

  @SubscribeMessage("joinRoom")
  async handleJoinRoom(client: Socket, data) {
    client.join(data.room);
    client.data.name = data.name;

    const sockets = await this.server.in(data.room).fetchSockets();

    this.server.in(data.room).emit("playerJoined", {
      users: sockets.map(socket => ({ name: socket.data.name })),
    });

    client.on("disconnecting", () => {
      console.log(client.rooms);

      client.rooms?.forEach(async room => {
        client.leave(room);
        const sockets = await this.server.in(room).fetchSockets();
        this.server.in(room).emit("playerLeft", {
          users: sockets.map(socket => ({ name: socket.data.name })),
        });
      });
    });
  }
}
