import { LoginResult } from "../models/Body/ResponseBody";
import { LoginBody } from "../models/Body/RequestBody";
import { FireStoreService } from "./firestore.service";
import { Database } from "./interface/database.interface";

class AccountService {
    constructor(private db : Database) {};


    validate(username : String, hashedPassword : String) : String {


        return "cookie goes here!";
    }

    createUser(username : String, hashedPasword : String, name : String) : String {
        this.db.addUser();

        return "cookie for creating new user goes here!";
    }
}


const accountService = new AccountService(
    // you can switch this out if needed 
    new FireStoreService()
    );

export { accountService }; 