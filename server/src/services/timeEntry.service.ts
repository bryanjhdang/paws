import { firestoreHelper } from "../helpers/firestore.helper";
import { DatabaseHelper } from "../helpers/interface/database.helper";
import { AccountHelper } from "../helpers/interface/account.helper";
import { OAuthHelper, oAuthHelper } from "../helpers/oAuth.helper";
import { TimeEntry } from "../models/TimeEntry";
import { AccountService, accountService } from "./account.service";
import { User } from "../models/User";
import { Project } from "../models/Project";
import { resolve } from "path";
import { rejects } from "assert";

export class TimeEntryService {
  constructor(private db: DatabaseHelper,
    private accountService: AccountHelper) { };

  startEntry(user: User, description: string, projectId: string, startTime: number, endTime : number) {
    if (user.currentTimeEntry.earnedCoins != -1) {
      throw Error("Unable to start an entry when user already has entry running");
    }
    user.currentTimeEntry = new TimeEntry('', startTime, endTime, projectId, description, 0);
    console.log("Updating user" + user);
    firestoreHelper.updateUser(user);
  }

  stopEntry(user : User, endTime: number): Promise<TimeEntry> {
    return new Promise<TimeEntry>((resolve, reject) => {
      if (user.currentTimeEntry.earnedCoins != -1) {
        let newTimeEntry = new TimeEntry('', 
            user.currentTimeEntry.startTime, 
            endTime, 
            user.currentTimeEntry.projectId,
            user.currentTimeEntry.name, 0);
        newTimeEntry.earnedCoins = (newTimeEntry.endTime - newTimeEntry.startTime) % 1000;

        user.currentTimeEntry = new TimeEntry();
        user.currentTimeEntry.earnedCoins = -1; // todo: think about how to do this better in the future
        user.totalCoins += newTimeEntry.earnedCoins;

        firestoreHelper.updateUser(user);
        firestoreHelper.createTimeEntry(user.id, newTimeEntry).then((timeEntry) => {
          resolve(timeEntry);
        });
      } else {
        console.log("User currently has no running time entry");
        reject(new Error("User currently has no running time entry"));
      }
  
    });
  }

  query(user: User, start: Date, end: Date, proejctId: string, name: string) : Promise<TimeEntry[]> {
    return firestoreHelper.getTimeEntries(user.id);
  }

  getProjects(user: User) : Promise<Project[]> {
    return firestoreHelper.getProjects(user.id);
  }

  createProject(user : User, name : string, hex : string) : Promise<string> {
    let newProject = new Project("", hex, name);
    return firestoreHelper.createProject(user.id, newProject);
  }
}

const timeEntryService = new TimeEntryService(
  firestoreHelper,
  oAuthHelper,
);

export { timeEntryService };