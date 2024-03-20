import { DatabaseHelper } from "./interface/database.helper";
import dotenv from "dotenv";
import * as admin from "firebase-admin"
import { User } from "../models/User";
import rootPath from "get-root-path";
import { TimeEntry } from "../models/TimeEntry";
import { Pet } from "../models/Pet";
import { Project } from "../models/Project";
dotenv.config();


export class FirestoreHelper implements DatabaseHelper {
    private db: admin.firestore.Firestore;
    private userDB: admin.firestore.CollectionReference;

    constructor() {
        try {
            var serviceAccount = rootPath + process.env.FIRESTORE_KEY || "oopsie whoopsie" as admin.ServiceAccount;

            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });

            this.db = admin.firestore();
            this.userDB = this.db.collection("users");

        } catch (error) {
            console.log("\x1b[31m", "ERROR: Unable to connect to Firestore Instance, did you include your Firestore key in the keys folder?");
            throw error;
        }
    }

    async updateUser(user: User) {
        this.userDB.doc(user.id).update(user.makeSimple());
    }

    async getUser(userId: string): Promise<User> {
        var data = (await this.userDB.doc(userId).get()).data();

        if (data) {
            return this.createUser(userId, data);
        }

        throw new Error(`Unable to find user with id ${userId}`);
    }

    async deleteUser(user: User): Promise<void> {
        this.userDB.doc(user.id).delete();
    }

    async addUser(user: User) : Promise<string> {
        const res = await this.userDB.add(user.makeSimple());
        return res.id;
    }

    private createUser(userId : string, data : admin.firestore.DocumentData) : User {
        return new User(
            userId,
            data!.displayName,
            new Pet(data!.pet.id, data!.pet.name, data!.pet.imageUrl),
            data!.timeEntries.map((element: any) => this.createTimeEntry(element)),
            data?.currentTimeEntry ? this.createTimeEntry(data.currentTimeEntry) : undefined,
            data!.project.map((element: any) => this.createProject(element)),
            data!.totalCoins
        );
    }

    private createTimeEntry(element: any): TimeEntry {
        return new TimeEntry(element.id, element.startTime, element.endTime, this.createProject(element.project), element.name, element.earnedCoins);
    }

    private createProject(project: any): Project {
        return new Project(project.id, project.name, project.hex)
    }

}

const firestoreHelper = new FirestoreHelper();

export { firestoreHelper };