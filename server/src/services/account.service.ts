import { FirestoreHelper, firestoreHelper } from "../helpers/firestore.helper";
import { DatabaseHelper } from "../helpers/interface/database.helper";
import { User } from "../models/User";


export class AccountService {
  constructor(private db: DatabaseHelper) { };

  getUserInfo(id : string) : User {
    return new User;
  }

  validate(username: String, hashedPassword: String): String {


    return "cookie goes here!";
  }

  createUser(username: String, hashedPasword: String, name: String): String {

    return "cookie for creating new user goes here!";
  }
}


const accountService = new AccountService(
  // you can switch this out if needed 
  firestoreHelper
);

export { accountService }; 