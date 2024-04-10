import { NoRunning, RunningCountdown, User } from "./models/User";
import { Socket } from "socket.io";
import { accountService } from "./services/account.service";

interface JoinedUser {
    displayName: string, 
    petIconId: number, 
    id: string, 
    startTime: number, 
    entryName: string

}

export function wsInit(io: any) {
    const connectedUsers: Map<string, User> = new Map<string, User>();

    function simplifyUser(user : User) : JoinedUser {
        let isWorking = user.runningTime instanceof NoRunning;
        return {
            displayName: user.displayName,
            petIconId: isWorking ? user.pet.workId : user.pet.restId,
            id: user.id,
            startTime: user.runningTime instanceof RunningCountdown ? user.runningTime.startTime : 0,
            entryName: user.runningTime instanceof RunningCountdown ? user.runningTime.name : "poo poo time"
        }
    }

    function updateUsers(user: User) {
        connectedUsers.set(user.id, user);
        let t =  [...connectedUsers.values()];
        console.log(t);
        io.emit(`users`, t);
    }

    io.on("connection", (socket: Socket) => {

        socket.on("join", async () => {
            let userId = socket.handshake.query.token;
            if (!userId) { return }

            let user: User = await accountService.getUserInfo(userId.toString());
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
            console.log(user);
            updateUsers(user);
        });
    });
}