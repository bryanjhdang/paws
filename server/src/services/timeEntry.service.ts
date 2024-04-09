import { firestoreHelper } from "../helpers/firestore.helper";
import { DatabaseHelper } from "../helpers/interface/database.helper";
import { AccountHelper } from "../helpers/interface/account.helper";
import { OAuthHelper, oAuthHelper } from "../helpers/oAuth.helper";
import { TimeEntry } from "../models/TimeEntry";
import { RunningCountdown, User } from "../models/User";
import { Project } from "../models/Project";
import { wsService, WsService } from "./websocket.service";

export class TimeEntryService {
  constructor(private db: DatabaseHelper,
    private accountService: AccountHelper,
    private wsService: WsService
  ) { };

  startEntry(user: User, description: string, projectId: string, startTime: number, endTime : number) {
    let result = user.stop(startTime);
    if (result instanceof TimeEntry) {
      firestoreHelper.createTimeEntry(user.id, result);
    }

    user.runningTime = new RunningCountdown(startTime, endTime, projectId, description);
    firestoreHelper.updateUser(user);
    wsService.updateUser(user);
  }

  stopEntry(user : User, endTime: number): Promise<TimeEntry> {
    return new Promise<TimeEntry>((resolve, reject) => {
      console.log(user);
      let result = user.stop(endTime);
      if (result instanceof TimeEntry) {
        try {
          firestoreHelper.updateUser(user);
          firestoreHelper.createTimeEntry(user.id, result).then((timeEntry) => {
            resolve(timeEntry);});
        } catch(err) {
          reject(err);
        }
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
    let newProject = new Project(hex, name);
    return firestoreHelper.createProject(user.id, newProject);
  }
}

const timeEntryService = new TimeEntryService(
  firestoreHelper,
  oAuthHelper,
  wsService
);

export { timeEntryService };