import { resolve } from "path";
import { FirestoreHelper, firestoreHelper } from "../helpers/firestore.helper";
import { DatabaseHelper } from "../helpers/interface/database.helper";
import { User } from "../models/User";


export class AccountService {
  constructor(private db: DatabaseHelper) { };

  async getUserInfo(id : string) : Promise<User> {
    return firestoreHelper.getUser(id);
  }

  validate(username: String, hashedPassword: String): String {


    return "cookie goes here!";
  }

  createUser(username: String, name: String): String {

    return "cookie for creating new user goes here!";
  }
}


const accountService = new AccountService(
  // you can switch this out if needed 
  firestoreHelper
);

export { accountService }; 