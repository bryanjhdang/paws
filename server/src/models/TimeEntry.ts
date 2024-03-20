import { Project } from "./Project";

export class TimeEntry {
    constructor(
        public id : string = '',
        public startTime: number = 0,
        public endTime: number = 0,
        public project: Project = new Project(),
        public name: string = '',
        public earnedCoins: number = 0
    ) { };

    makeSimple(userId : string) {
        return {
            id: this.id,
            startTime: this.startTime,
            endTime: this.endTime,
            project: this.project.makeSimple(userId),
            name: this.name,
            earnedCoins: this.earnedCoins
        }
    }
}