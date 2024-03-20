import { User } from "../../models/User";

export interface DatabaseHelper {
    updateUser(user: User) : void;

    getUser(userId: string): Promise<User>;

    addUser(user: User) : Promise<string>;

    deleteUser(user: User) : void;
}