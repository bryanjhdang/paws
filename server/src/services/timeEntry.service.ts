import { firestoreHelper } from "../helpers/firestore.helper";
import { DatabaseHelper } from "../helpers/interface/database.helper";
import { AccountHelper } from "../helpers/interface/account.helper";
import { OAuthHelper, oAuthHelper } from "../helpers/oAuth.helper";
import { TimeEntry } from "../models/TimeEntry";
import { AccountService, accountService } from "./account.service";

export class TimeEntryService {
  constructor(private db: DatabaseHelper, 
              private accountService: AccountHelper) { };

  startEntry(userId: string, description: string, projectId: string, startTime: Date) : string {
    return "id for the created time entry goes here"
  }

  stopEntry(userId: string, endTime: Date) : TimeEntry {
    return new TimeEntry;
  }

  getEntries(start : Date, end: Date, proejctId : string, name : string) {
    return [];
  }
}

const timeEntryService = new TimeEntryService(
  firestoreHelper,
  oAuthHelper,
);

export { timeEntryService };