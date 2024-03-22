import { userInfo } from "os";
import { Pet } from "./Pet";
import { Project } from "./Project";
import { TimeEntry } from "./TimeEntry";

export interface RunningTime {
    createTimeEntry(endTime : number) : TimeEntry | boolean;

    makeSimple() : any;
}

export class RunningStopwatch implements RunningTime {
    constructor(
        public startTime: number = 0,
        public projectId: string = '',
        public name: string = '',
    ) {};

    createTimeEntry(endTime : number) : TimeEntry  {
        return new TimeEntry(this.startTime, endTime, this.projectId, this.name);

    }

    makeSimple() : any {
        return {
            startTime: this.startTime,
            projectId: this.projectId,
            name: this.name
        }
    }
}

export class RunningCountdown implements RunningTime {
    constructor(
        public startTime: number = 0,
        public plannedEndTime: number = 0,
        public projectId: string = '',
        public name: string = '',
    ) {};

    createTimeEntry(endTime : number) : TimeEntry  {
        return new TimeEntry(this.startTime, endTime, this.projectId, this.name);
    }

    makeSimple() : any {
        return {
            startTime: this.startTime,
            plannedEndTime: this.plannedEndTime,
            projectId: this.projectId,
            name: this.name
        }
    }
}

export class NoRunning implements RunningTime {
    createTimeEntry(endTime: number): boolean | TimeEntry {
        return false;
    }

    makeSimple() {
        return deleteField();
    }
}

export class User {
    public id: string = '';
    constructor(
        public displayName: string = '',
        public pet: Pet = new Pet(),
        public runningTime: RunningTime = new NoRunning(),
        public totalCoins: number = 0,
    ) { };

    makeSimple() {
        return {
            id: this.id,
            displayName: this.displayName,
            pet: this.pet.makeSimple(),
            runningTime: this.runningTime.makeSimple(),
            totalCoins: this.totalCoins
        } 
    };

    stop(endTime : number) : TimeEntry | boolean {
        let result = this.runningTime.createTimeEntry(endTime);
        if (result instanceof TimeEntry) {
            this.totalCoins += result.earnedCoins;
        } 
        this.runningTime = new NoRunning();
        return result;
    }

}   