import { userInfo } from "os";
import { Pet } from "./Pet";
import { Project } from "./Project";
import { TimeEntry } from "./TimeEntry";

export class User {
    constructor(
        public id: string = '' ,
        public displayName: string = '',
        public pet: Pet = new Pet(),
        public timeEntries: TimeEntry[] = [],
        public currentTimeEntry: TimeEntry | undefined = new TimeEntry(),
        public projects: Project[] = [],
        public totalCoins: number = 0,
    ) { };

    makeSimple() {
        return {
            id: this.id,
            displayName: this.displayName,
            pet: this.pet.makeSimple(),
            timeEntries: this.timeEntries.map(entry => entry.makeSimple(this.id)),
            currentTimeEntry: this.currentTimeEntry ? this.currentTimeEntry.makeSimple(this.id) : undefined,
            projects: this.projects.map(proj => proj.makeSimple(this.id)),
            totalCoins: this.totalCoins
        } 
    };
}