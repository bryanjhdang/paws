import express, { Request, Response, Router } from "express";
import { TimeEntryService, timeEntryService } from "../services/timeEntry.service";
import { TimeEntry } from "../models/TimeEntry";
import { StatusCodes } from "http-status-codes";
import { petService } from "../services/pet.service";
import { Project } from "../models/Project";
import { BADQUERY } from "dns";

const timeEntryController : Router = express.Router();

interface GetTimeEntryResponse {
    timeEntries : TimeEntry[]
}
timeEntryController.get('/', (req : Request, res : Response) => {

    try {
        var query = {
            name : req.query.name ? req.query.name.toString() : "",
            startTime :  req.query.start ? new Date(parseInt(req.query.start.toString())) : new Date(Number.MIN_VALUE),
            endTime : req.query.end ? new Date(parseInt(req.query.end.toString())) : new Date(Number.MAX_VALUE),
            projectId : req.query.projectId ? req.query.projectId.toString() : "",
        }
    } catch (error) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
            .json({message : "Invalid parameters for query string!"});
    }

    let response : GetTimeEntryResponse = {
        timeEntries: timeEntryService.query(res.locals.user, query.startTime, query.endTime, query.projectId, query.name)
    }

    res.status(StatusCodes.CREATED)
        .json(response)
});


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
interface createProjectResponse  {
    projectId: string;
}
timeEntryController.post('/project', (req : Request, res: Response) => {
    let body : createProjectRequest = req.body;

    let idPromise = timeEntryService.createProject(res.locals.user, body.name, body.hexColour);
    idPromise
    .then((id) => {
        let response : createProjectResponse = {
            projectId: id
        }

        res.status(StatusCodes.CREATED)
        .json(response);
    }).catch(() => {
        res.status(StatusCodes.NOT_FOUND)
            .json({messsage: `Missing could not find projects for user ${res.locals.user.id}`});
    });
   
   
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