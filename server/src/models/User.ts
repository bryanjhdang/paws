import { Pet } from "./Pet";
import { Project } from "./Project";
import { TimeEntry } from "./TimeEntry";

export class User {
    constructor(
        public id: string = '',
        public displayName: string = '',
        public pet: Pet = new Pet(),
        public timeEntries: TimeEntry[] = [],
        public currentTimerStart: number = 0,
        public projects: Project[] = [],
        public totalCoins: number = 0
    ) { };
}