import { Project } from "./Project";

export interface TimeEntry {
    startTime: number,
    endTime: number,
    project: Project,
    name: string
}