import { firestoreHelper } from "../helpers/firestore.helper";
import { DatabaseHelper } from "../helpers/interface/database.helper";
import { AccountHelper } from "../helpers/interface/account.helper";
import { OAuthHelper, oAuthHelper } from "../helpers/oAuth.helper";
import { TimeEntry } from "../models/TimeEntry";
import { AccountService, accountService } from "./account.service";
import { User } from "../models/User";
import { Project } from "../models/Project";

export class TimeEntryService {
  constructor(private db: DatabaseHelper,
    private accountService: AccountHelper) { };

  startEntry(user: User, description: string, projectId: string, startTime: Date): string {
    let timeEntry = new TimeEntry()
    
    return "id for the created time entry goes here"
  }

  stopEntry(user : User, endTime: Date): TimeEntry {
    return new TimeEntry;
  }

  query(user: User, start: Date, end: Date, proejctId: string, name: string) {
    return [];
  }

  getProjects(user: User) : Promise<Project[]> {
    return firestoreHelper.getProjects(user.id);
  }

  createProject(user : User, name : string, hexColour : string) : Promise<string> {
    let newProject = new Project("", hexColour, name);
    return firestoreHelper.createProject(user.id, newProject);
  }
}

const timeEntryService = new TimeEntryService(
  firestoreHelper,
  oAuthHelper,
);

export { timeEntryService };