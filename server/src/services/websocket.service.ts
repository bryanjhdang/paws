import { User } from "../models/User";
import { io, Socket } from "socket.io-client"


export class WsService {
    private ws: Socket = io(`http://localhost:${process.env.PORT || 8080}`);

    constructor() {
    }

    updateUser(user: User) {
        this.ws.emit('updateUser', user);
    }
}

const wsService = new WsService();

export { wsService }