import { DatabaseHelper } from "./interface/database.helper";
import dotenv from "dotenv";
import * as admin from "firebase-admin"
import { NoRunning, RunningCountdown, RunningStopwatch, RunningTime, User } from "../models/User";
import rootPath from "get-root-path";
import { TimeEntry } from "../models/TimeEntry";
import { Pet } from "../models/Pet";
import { Project } from "../models/Project";
import { Todo } from "../models/Todo";
dotenv.config();


export class FirestoreHelper implements DatabaseHelper {
  private db: admin.firestore.Firestore;
  private userDB: admin.firestore.CollectionReference;
  private timeEntryDB: admin.firestore.CollectionReference;
  private projectDB: admin.firestore.CollectionReference;
  private todoDB: admin.firestore.CollectionReference;

  constructor() {
    try {
      if (process.env.FIRESTORE_KEY != "CLOUD") {
        var serviceAccount = rootPath + process.env.FIRESTORE_KEY || "oopsie whoopsie" as admin.ServiceAccount;

        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount)
        });
      } else {
        admin.initializeApp();
        console.log("\x1b[34m", "Connecting to Firestore over Google Cloud, make sure you authorized the instance to connect");
      }


      this.db = admin.firestore();
      this.userDB = this.db.collection("users");
      this.timeEntryDB = this.db.collection("timeEntries");
      this.projectDB = this.db.collection("projects");
      this.todoDB = this.db.collection("todos");


    } catch (error) {
      console.log("\x1b[31m", "ERROR: Unable to connect to Firestore Instance, did you include your Firestore key in the keys folder?");
      throw error;
    }
  }

  private serializeUser(user: User) {
    return {
      id: user.id,
      displayName: user.displayName,
      pet: this.serializePet(user.id, user.pet),
      runningTime: this.serializeRunningTime(user.runningTime),
      totalCoins: user.totalCoins
    }
  }

  private serializeRunningTime(runningTime: RunningTime) {
    if (runningTime instanceof RunningCountdown) {
      return {
        startTime: runningTime.startTime,
        plannedEndTime: runningTime.plannedEndTime,
        projectId: runningTime.projectId,
        name: runningTime.name
      }
    } else if (runningTime instanceof RunningStopwatch) {
      return {
        startTime: runningTime.startTime,
        projectId: runningTime.projectId,
        name: runningTime.name
      }
    }

    return admin.firestore.FieldValue.delete();
  }

  private serializeTimeEntry(userId: string, timeEntry: TimeEntry) {
    return {
      id: timeEntry.id,
      startTime: timeEntry.startTime,
      endTime: timeEntry.endTime,
      projectId: timeEntry.projectId,
      name: timeEntry.name,
      earnedCoins: timeEntry.earnedCoins,
      userId: userId
    }
  }

  private serializeProject(userId: string, project: Project) {
    return {
      userId: userId,
      hex: project.hex,
      name: project.name,
      dateCreated: project.dateCreated,
      id: project.id
    }
  }

  private serializePet(userId : string, pet : Pet) {
    return {
      userId: userId,
      restId: pet.restId, 
      workId: pet.workId,
      ownedCats : pet.ownedCats,
    }
  }

  private deserializePet(userId : string, data: admin.firestore.DocumentData) : Pet {
    return new Pet(data.restId, data.workId, data.ownedCats);
  }

  private serializeTodo(userId: string, todo: Todo) {
    return {
      userId: userId, 
      task: todo.task,
      dateCreated: todo.dateCreated,
      done: todo.done,
      id: todo.id
    }
  }

  private deserializeTodo(element : any) : Todo {
    return new Todo(element.task, element.dateCreated, element.done, element.id); 
  }

  private saveTodo(userId: string, todo: Todo) : Promise<Todo> {
    return new Promise<Todo>((resolve, reject) => {
      this.todoDB.doc(todo.id).set(this.serializeTodo(userId, todo))
        .then(() => {
          resolve(todo);
        })
        .catch((err : Error) => {
          console.log(err);
          reject(err);
        })
    });
  }

  private deserializeUser(userId: string, data: admin.firestore.DocumentData): User {
    return new User(
      data!.displayName,
      this.deserializePet(userId, data.pet),
      data?.runningTime ? this.deserializeRunningTime(data.runningTime) : new NoRunning(),
      data!.totalCoins,
      userId
    );
  }

  private deserializeRunningTime(element: any): RunningTime {
    if (element.plannedEndTime) {
      return new RunningCountdown(element.startTime, element.plannedEndTime, element.projectId, element.name);
    }

    if (element) {
      return new RunningStopwatch(element.startTime, element.projectId, element.name);
    }

    return new NoRunning();
  }

  private deserializeTimeEntry(element: any): TimeEntry {
    return new TimeEntry(element.startTime, element.endTime, element.projectId, element.name, element.id, element.earnedCoins);
  }

  private deserializeProject(project: any): Project {
    return new Project(project.hex, project.name, project.dateCreated, project.id)
  }


  updateUser(user: User) {
    this.userDB.doc(user.id).update(this.serializeUser(user));
  }

  getUser(userId: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.userDB.doc(userId).get().then(snap => {
        const data = snap.data();
        if (data) {
          resolve(this.deserializeUser(userId, data));
        } else {
          reject(Error(`Unable to find data for user with id ${userId}`));
        }
      })
        .catch((err : Error) => {
          console.log(err);
          reject(err);
        })
    })
  }

  async deleteUser(user: User): Promise<void> {
    this.userDB.doc(user.id).delete();
  }

  async addUser(user: User): Promise<string> {
    user.id = this.userDB.doc().id;
    this.userDB.doc(user.id).set(this.serializeUser(user));
    return user.id;
  }

  createTimeEntry(userId: string, timeEntry: TimeEntry): Promise<TimeEntry> {
    return new Promise<TimeEntry>((resolve, reject) => {
      timeEntry.id = this.timeEntryDB.doc().id;
      this.timeEntryDB.doc(timeEntry.id).set(this.serializeTimeEntry(userId, timeEntry))
        .then(() => {
          resolve(timeEntry);
        })
        .catch((err : Error) => {
          console.log(err);
          reject(err);
        })
    });
  }

  createProject(userId: string, project: Project): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      project.id = this.projectDB.doc().id;
      this.projectDB.doc(project.id).set(this.serializeProject(userId, project))
        .then(() => {
          resolve(project.id);
        })
        .catch((err : Error) => {
          console.log(err);
          reject(err);
        })
    });
  }

  getTimeEntries(userId: string): Promise<TimeEntry[]> {
    return new Promise<TimeEntry[]>((resolve, reject) => {
      this.timeEntryDB.where('userId', "==", userId).get()
        .then(snap => {
          let result: TimeEntry[] = [];
          snap.forEach(doc => {
            if (doc) {
              result.push(this.deserializeTimeEntry(doc.data()));
            }
          });

          resolve(result);
        })
        .catch((err : Error) => {
          console.log(err);
          reject(err);
        })
    });
  }

  getProjects(userId: string): Promise<Project[]> {
    return new Promise<Project[]>((resolve, reject) => {
      this.projectDB.where('userId', "==", userId).get()
        .then(snap => {
          let result: Project[] = [];
          snap.forEach(doc => {
            if (doc) {
              result.push(this.deserializeProject(doc.data()));
            }
          });

          resolve(result);
        })
        .catch((err : Error) => {
          console.log(err);
          reject(err);
        })
    })
  }

  deleteProject(projectId: string) : void {
    this.projectDB.doc(projectId).delete()
      .catch((err : Error) => {
      console.log(err);
    })  
  }

  createTodo(userId: string, todo: Todo) : Promise<Todo> {
    todo.id = this.todoDB.doc().id;
    return this.saveTodo(userId, todo);
  }

  getTodos(userId: string) : Promise<Todo[]> {
    return new Promise<Todo[]>((resolve, reject) => {
      this.todoDB.where('userId', "==", userId).get()
        .then(snap => {
          let result: Todo[] = [];
          snap.forEach(doc => {
            if (doc) {
              result.push(this.deserializeTodo(doc.data()));
            }
          });

          resolve(result);
        })
        .catch((err : Error) => {
          console.log(err);
          reject(err);
        })
    })
  }

  deleteTodo(todoId: string) : void {
    this.todoDB.doc(todoId).delete()
      .catch((err : Error) => {
      console.log(err);
    })  
  }

  editTodo(userId : string, todo: Todo) : Promise<Todo> {
    return this.saveTodo(userId, todo);
  }

}

const firestoreHelper = new FirestoreHelper();

export { firestoreHelper };