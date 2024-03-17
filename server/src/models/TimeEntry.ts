import { Project } from "./Project";

export class TimeEntry {
    constructor(
        id : string = '',
        startTime: number = 0,
        endTime: number = -1,
        project: Project = new Project(),
        name: string = '',
        earnedCoins: number = 0
    ) { };
}