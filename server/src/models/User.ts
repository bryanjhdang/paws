import { userInfo } from "os";
import { Pet } from "./Pet";
import { Project } from "./Project";
import { TimeEntry } from "./TimeEntry";

export class User {
    constructor(
        public id: string = '' ,
        public displayName: string = '',
        public pet: Pet = new Pet(),
        public currentTimeEntry: TimeEntry | undefined = new TimeEntry(),
        public totalCoins: number = 0,
    ) { };

    makeSimple() {
        return {
            id: this.id,
            displayName: this.displayName,
            pet: this.pet.makeSimple(),
            currentTimeEntry: this.currentTimeEntry ? this.currentTimeEntry.makeSimple(this.id) : undefined,
            totalCoins: this.totalCoins
        } 
    };
}