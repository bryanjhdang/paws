import { Project } from "../../models/Project";
import { TimeEntry } from "../../models/TimeEntry";
import { User } from "../../models/User";

export interface DatabaseHelper {
    updateUser(user: User) : void;

    getUser(userId: string): Promise<User>;

    addUser(user: User) : Promise<string>;

    deleteUser(user: User) : void;


    // createTimeEntry(timeEntry : TimeEntry) : Promise<string>;

    // updateTimeEntry(timeEntry : TimeEntry) : void;

    // getTimeEntry(timeEntryId: string) : Promise<TimeEntry>;

    // getTimeEntries(userId: string) : Promise<TimeEntry[]>;

    // deleteTimeEnty(timeEntryId: string) : void;


    createProject(userId : string, project : Project) : Promise<string>;

    // updateProject(project : Project) : void;

    // getProjects(userId: string) : Promise<Project[]>;

    // deleteProject(projectId: string) : void;
}