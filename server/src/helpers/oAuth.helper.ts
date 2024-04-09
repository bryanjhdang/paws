import { Pet } from "../models/Pet";
import { NoRunning, User } from "../models/User";
import { firestoreHelper } from "./firestore.helper";

export class OAuthHelper {
    async getUser(oAuthSub: string): Promise<User> {
        return firestoreHelper.getUser(oAuthSub);
    }

    async addNewUser(oAuthSub: string): Promise<User> {
        // todo: initialize username in a better way
        let user = new User("temp_name", new Pet(), new NoRunning(), 0, oAuthSub);


        const id = firestoreHelper.addUser(user);
        return firestoreHelper.getUser(oAuthSub); // todo: return directly?
    }
}

const oAuthHelper = new OAuthHelper();

export { oAuthHelper };