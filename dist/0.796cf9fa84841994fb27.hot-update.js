"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 10:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameGateway = void 0;
const websockets_1 = __webpack_require__(11);
const socket_io_1 = __webpack_require__(12);
let GameGateway = class GameGateway {
    constructor() {
        this.users = 0;
    }
    async handleConnection() {
        this.users++;
        this.server.emit("users", this.users);
    }
    async handleDisconnect(client) {
        console.log("onleave", client.rooms);
    }
    async handleJoinRoom(client, data) {
        console.log("onjoin", client.rooms);
        client.join(data.room);
        client.data.name = data.name;
        console.log("onjoin", client.rooms);
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
    __metadata("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], GameGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("joinRoom"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("leaveRoom"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleLeaveRoom", null);
GameGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true })
], GameGateway);
exports.GameGateway = GameGateway;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("0a09e9427f1337c06d0a")
/******/ })();
/******/ 
/******/ }
;