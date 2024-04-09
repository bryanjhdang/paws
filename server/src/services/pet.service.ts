import { firestoreHelper } from "../helpers/firestore.helper";
import { DatabaseHelper } from "../helpers/interface/database.helper";
import { Pet } from "../models/Pet";
import { User } from "../models/User";

export class PetService {

    constructor(private db: DatabaseHelper) { };

    getCoins(user : User) : number {
        return 0;
    }

    addCoins(user: User, count : number) : number {
        return 0;
    }

    getPet(user: User) : Pet {
        return new Pet();
    }

    async equipPet(user: User, workId: number, restId: number) {
        if (!user.pet.ownedCats.includes(restId) || !user.pet.ownedCats.includes(workId)) {
            throw new Error("User does not own the given pet");
        } 

        user.pet.restId = restId;
        user.pet.workId = workId;
        firestoreHelper.updateUser(user);
    }

    async buyPet(user : User, id: number, cost: number) {
        if (user.totalCoins < cost) {
            throw new Error("User does not have enough coins for this purchase");
        }

        user.totalCoins -= cost;
        user.pet.ownedCats.push(id);
        firestoreHelper.updateUser(user);
    }
}

const petService = new PetService(
    firestoreHelper
);

export { petService }

