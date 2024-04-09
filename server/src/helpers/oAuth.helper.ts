import { Pet } from "../models/Pet";
import { NoRunning, User } from "../models/User";
import { firestoreHelper } from "./firestore.helper";

export class OAuthHelper {
    async getUser(oAuthSub: string): Promise<User> {
        return firestoreHelper.getUser(oAuthSub);
    }

    async addNewUser(oAuthSub: string): Promise<User> {
        // let newUser = new User('default_name', new Pet(), undefined, 0, oAuthSub);
        let user = new User("temp_name", new Pet(), new NoRunning(), 0, oAuthSub);
        console.log("here...\n");
        // user.id = oAuthSub;

        // let user = new User("test name", new Pet());
        // let user = new User();
        // user.id = oAuthSub;

        const id = firestoreHelper.addUser(user);
        console.log("here...\n");
        return firestoreHelper.getUser(oAuthSub); // todo: return directly?
    }
}

const oAuthHelper = new OAuthHelper();

export { oAuthHelper };