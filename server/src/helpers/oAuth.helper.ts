import { Pet } from "../models/Pet";
import { User } from "../models/User";
import { firestoreHelper } from "./firestore.helper";

export class OAuthHelper {
    async getUser(oAuthSub: string): Promise<User> {
        return firestoreHelper.getUser(oAuthSub);
    }
}

const oAuthHelper = new OAuthHelper();

export { oAuthHelper };