import { Project } from "./Project";

export class TimeEntry {
    constructor(
        startTime: number = 0,
        endTime: number = 0,
        project: Project = new Project(),
        name: string = '',
        earnedCoins: number = 0
    ) { };
}