import { Project } from "./Project";

export class TimeEntry {
    public earnedCoins: number = (this.endTime - this.startTime) % 1000;
    public id : string = '';

    constructor(
        public startTime: number = 0,
        public endTime: number = 0,
        public projectId: string = '',
        public name: string = '',
    ) { };
}