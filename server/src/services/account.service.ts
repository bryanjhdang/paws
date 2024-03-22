import { resolve } from "path";
import { FirestoreHelper, firestoreHelper } from "../helpers/firestore.helper";
import { DatabaseHelper } from "../helpers/interface/database.helper";
import { User } from "../models/User";
import { Pet } from "../models/Pet";


export class AccountService {
  constructor(private db: DatabaseHelper) { };

  async getUserInfo(id : string) : Promise<User> {
    return firestoreHelper.getUser(id);
  }

  validate(username: String, hashedPassword: String): String {


    return "cookie goes here!";
  }

  createUser(username: string, name: string): Promise<string> {
    let user = new User(name, new Pet());
    return firestoreHelper.addUser(user);
  }
}


const accountService = new AccountService(
  // you can switch this out if needed 
  firestoreHelper
);

export { accountService }; 