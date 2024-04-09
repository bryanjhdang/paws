import { firestoreHelper } from "../helpers/firestore.helper";
import { DatabaseHelper } from "../helpers/interface/database.helper";
import { Pet } from "../models/Pet";
import { User } from "../models/User";

export class PetService {
    constructor(private db: DatabaseHelper) { };

    getCoins(user : User) : number {
        return user.totalCoins;
    }

    addCoins(user: User, count : number) : number {
        return 0;
    }

    getPet(user: User) : Pet {
        return new Pet();
    }
}

const petService = new PetService(
    firestoreHelper
);

export { petService }

