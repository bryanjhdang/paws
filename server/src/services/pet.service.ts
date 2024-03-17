import { firestoreHelper } from "../helpers/firestore.helper";
import { DatabaseHelper } from "../helpers/interface/database.helper";
import { Pet } from "../models/Pet";

export class PetService {
    constructor(private db: DatabaseHelper) { };

    getCoins(userId : string) : number {
        return 0;
    }

    addCoins(userId: string, count : number) : number {
        return 0;
    }

    getPet(userId: string) : Pet {
        return new Pet();
    }
}

const petService = new PetService(
    firestoreHelper
);

export { petService }

