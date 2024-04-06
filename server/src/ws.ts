import { User } from "./models/User";
import { Socket } from "socket.io";


export function wsInit(socket : any) {
    const connectedUsers: Map<string, User> = new Map<string, User>();

    socket.on("connection", (socket: Socket) => {
        console.log("Received web socket connection")
        socket.emit("test", "this is a test value!");
    
    
        socket.on('updateUser', (user: User) => {
            connectedUsers.set(user.id, user);
            socket.emit("users", [...connectedUsers.values()]);
        });
    
        socket.on('close', (userId: string) => {
            connectedUsers.delete(userId);
            socket.emit("roomState", [...connectedUsers.values()]);
        });
    });
}