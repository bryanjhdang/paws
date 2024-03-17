import { DatabaseHelper } from "./interface/database.helper";

export class FirestoreHelper implements DatabaseHelper {

}

const firestoreHelper = new FirestoreHelper();

export { firestoreHelper };