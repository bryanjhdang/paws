import express, { Request, Response, Router } from "express";
import { timeEntryService } from "../services/timeEntry.service";
import { TimeEntry } from "../models/TimeEntry";
import { StatusCodes } from "http-status-codes";
import { petService } from "../services/pet.service";
import { Project } from "../models/Project";

const timeEntryController : Router = express.Router();

interface StartRequest {
    entryName : string,
    projectId: string,
    startTime: number
}
interface StartResponse {
    newEntryId: string
}
timeEntryController.post(`/start`, (req: Request, res: Response) => {
    let body : StartRequest = req.body;

    let startResponse : StartResponse = {
        newEntryId: timeEntryService.startEntry(res.locals.user, body.entryName, body.projectId, new Date(body.startTime))
    }
    res.status(StatusCodes.CREATED)
        .json(startResponse);
});


interface StopRequest {
    entryId: string,
    endTime: number
}
interface StopResponse {
    createdEntry : TimeEntry,
    totalCoins : number
}
timeEntryController.post('/stop', (req: Request, res: Response) => {
    let body : StopRequest = req.body;
    
    let stopResponse : StopResponse = {
        createdEntry:  timeEntryService.stopEntry(res.locals.user, new Date(body.endTime)),
        totalCoins: petService.getCoins(res.locals.user)
    }
    res.status(StatusCodes.CREATED)
        .json(stopResponse)
});

interface uploadRequest extends TimeEntry{
}
interface uploadResponse {

}
timeEntryController.post('/upload', (req: Request, res: Response) => {
    // not needed for now I think
});


interface createProjectRequest {
    name : string,
    hexColour : string, 
}
interface createProjectResponse extends Project {
}
timeEntryController.post('/project', (req : Request, res: Response) => {
    let body : createProjectRequest = req.body;

    let createProjectResponse : createProjectResponse = {
        project: timeEntryService.createProject(res.locals.user, body.name, body.hexColour)
    }
    res.status(StatusCodes.CREATED)
        .json(createProjectResponse);
});

interface getProjectResponse {
    projects : Project[];
}
timeEntryController.get('/project', (req : Request, res: Response) => {

    let getProjectResponse = {
        projects : timeEntryService.getProjects(res.locals.user)
    }
    res.status(StatusCodes.OK)
        .json(getProjectResponse);
})

export { timeEntryController };