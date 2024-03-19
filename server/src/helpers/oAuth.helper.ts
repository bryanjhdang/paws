import { Pet } from "../models/Pet";
import { User } from "../models/User";

export class OAuthHelper {
    getUser(OAuthSub: string): User {
        return new User();
    }
}

const oAuthHelper = new OAuthHelper();

export { oAuthHelper };