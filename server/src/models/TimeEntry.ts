import { Project } from "./Project";

export class TimeEntry {

    constructor(
        public startTime: number = 0,
        public endTime: number = 0,
        public projectId: string = '',
        public name: string = '',
        public id : string = '',
        public earnedCoins: number = (endTime - startTime) % 1000
    ) { };
}