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


            // const testUser = new User(
            //     '123', // id
            //     'John Doe', // displayName
            //     new Pet('456', 'Fluffy', 'https://example.com/fluffy.jpg'), // pet
            //     [
            //         new TimeEntry('111', 1615814400, 1615825200, new Project('789', '#FF0000', 'Project A'), 'Work on Project A', 10), // timeEntries
            //         new TimeEntry('222', 1615900800, 1615911600, new Project('789', '#FF0000', 'Project A'), 'Work on Project A', 15)  // additional time entry
            //     ],
            //     new TimeEntry('333', 1615987200, 1615998000, new Project('123', '#00FF00', 'Project B'), 'Work on Project B', 20), // currentTimeEntry
            //     [
            //         new Project('789', '#FF0000', 'Project A'), // projects
            //         new Project('123', '#00FF00', 'Project B')  // additional project
            //     ],
            //     100 // totalCoins
            // );
            // this.userDB.add(testUser.makeSimple()).then(res => {
            //     console.log(res.id);
            // });



            // //     var res = this.userDB.doc('sameple1').get().then(snap => {
            // //         console.log(snap.data()!.test);

            // // });
            var test = this.getUser("nemLmP1npemf5VSzAKRC").then(user => console.log(user));
        } catch (error) {
            console.log("\x1b[31m", "ERROR: Unable to connect to Firestore Instance, did you include your Firestore key in the keys folder?");
            throw error;
        }
    }

    saveUser(user: User) {
        var test = this.userDB.add(user);
    }

    async getUser(userId: string): Promise<User> {
        var snap = await this.userDB.doc(userId).get();

        var data = snap.data();

        // console.log(data);
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


    async addUser(user: User) {
        const res = await this.userDB.add(user);
        return res.id;
    }


}

const firestoreHelper = new FirestoreHelper();

export { firestoreHelper };