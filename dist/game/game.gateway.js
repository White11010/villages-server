"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let GameGateway = class GameGateway {
    constructor() {
        this.users = 0;
    }
    async handleConnection() {
        this.users++;
        this.server.emit("users", this.users);
    }
    async handleDisconnect(arg) {
        console.log(arg);
    }
    async handleJoinRoom(client, data) {
        client.join(data.room);
        client.data.name = data.name;
        const sockets = await this.server.in(data.room).fetchSockets();
        this.server.in(data.room).emit("playerJoined", {
            users: sockets.map(socket => ({ name: socket.data.name })),
        });
    }
    async handleLeaveRoom(client, data) {
        console.log(data);
        client.leave(data.room);
        const sockets = await this.server.in(data.room).fetchSockets();
        this.server.in(data.room).emit("playerLeft", {
            users: sockets.map(socket => ({ name: socket.data.name })),
        });
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], GameGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("joinRoom"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("leaveRoom"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleLeaveRoom", null);
GameGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true })
], GameGateway);
exports.GameGateway = GameGateway;
//# sourceMappingURL=game.gateway.js.map