import { User } from "./models/User";
import { Socket } from "socket.io";
import { accountService } from "./services/account.service";


export function wsInit(io: any) {
    const connectedUsers: Map<string, User> = new Map<string, User>();

    function updateUsers(user: User) {
        connectedUsers.set(user.id, user);
        io.emit(`users`, [...connectedUsers.values()]);
    }

    io.on("connection", (socket: Socket) => {

        socket.on("join", async () => {
            let userId = socket.handshake.query.token;
            if (!userId) { return }

            let user: User = await accountService.getUserInfo(userId.toString());
            console.log("sending from join");
            updateUsers(user);
        })

        socket.on('disconnect', () => {
            let userId = socket.handshake.query.token;
            if (!userId) { return }


            connectedUsers.delete(userId.toString());
            io.emit("users", [...connectedUsers.values()]);
            console.log(`Lost connection from user ${userId}`);

        });

        socket.on('updateUser', (user: User) => {
            console.log("sending from internal");
            updateUsers(user);
        });
    });
}