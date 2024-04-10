import { Pet } from "../models/Pet";
import { NoRunning, User } from "../models/User";
import { firestoreHelper } from "./firestore.helper";

export class OAuthHelper {
    async getUser(oAuthSub: string): Promise<User> {
        return firestoreHelper.getUser(oAuthSub);
    }

    // note: in the process of phasing out this function, use with caution
    async addNewUser(oAuthSub: string): Promise<User> {
        // let user = new User("temp_name", new Pet(), new NoRunning(), 0, oAuthSub);
        let user = new User();
        user.id = oAuthSub;

        const id = firestoreHelper.addUser(user);
        return firestoreHelper.getUser(oAuthSub); // todo: return directly?
    }
}

const oAuthHelper = new OAuthHelper();

export { oAuthHelper };