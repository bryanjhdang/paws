import { Pet } from "./Pet";
import { Project } from "./Project";
import { TimeEntry } from "./TimeEntry";

export interface User {
    id: number,
    displayName: string, 
    username: string,
    hashedPassword: string,
    pet: Pet,
    timeEntries : TimeEntry[],
    currentTimerStart: number,
    projects : Project[]
}