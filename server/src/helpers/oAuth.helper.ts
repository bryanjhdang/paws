import { Pet } from "../models/Pet";
import { User } from "../models/User";
import { firestoreHelper } from "./firestore.helper";

export class OAuthHelper {
    async getUser(oAuthSub: string): Promise<User> {
        return firestoreHelper.getUser(oAuthSub);
    }

    async addNewUser(oAuthSub: string): Promise<User> {
        let newUser = new User('default_name', new Pet(), undefined, 0, oAuthSub);
        const id = firestoreHelper.addUser(newUser);
        return firestoreHelper.getUser(oAuthSub); // todo: return directly?
    }
}

const oAuthHelper = new OAuthHelper();

export { oAuthHelper };