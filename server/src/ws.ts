import { User } from "./models/User";
import { Socket } from "socket.io";


export function wsInit(io : any) {
    const connectedUsers: Map<string, User> = new Map<string, User>();

    io.on("connection", (socket: Socket) => {    
        socket.on('updateUser', (user: User) => {
            connectedUsers.set(user.id, user);
            io.emit(`users`, [...connectedUsers.values()]);
        });
    
        socket.on('close', (userId: string) => {
            connectedUsers.delete(userId);
            socket.emit("roomState", [...connectedUsers.values()]);
        });
    });
}