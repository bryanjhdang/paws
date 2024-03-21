import express, { Request, Response, Router } from "express";
import { TimeEntryService, timeEntryService } from "../services/timeEntry.service";
import { TimeEntry } from "../models/TimeEntry";
import { StatusCodes } from "http-status-codes";
import { petService } from "../services/pet.service";
import { Project } from "../models/Project";
import { BADQUERY } from "dns";
import { time } from "console";

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
    startTime: number,
    endTime: number
}
interface StartResponse {
    newEntryId: string
}
timeEntryController.post(`/start`, (req: Request, res: Response) => {
    let body : StartRequest = req.body;
    try {
        timeEntryService.startEntry(res.locals.user, body.entryName, body.projectId, body.startTime, body.endTime);
        res.status(StatusCodes.CREATED)
        .json({message: "Started time entry!"});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({message: "Unable to start timer on user that is already running"});
    }
});


interface StopRequest {
    endTime: number
}
interface StopResponse {
    createdEntry : TimeEntry,
    totalCoins : number
}
timeEntryController.post('/stop', (req: Request, res: Response) => {
    let body : StopRequest = req.body;

    timeEntryService.stopEntry(res.locals.user, body.endTime)
    .then((timeEntry) => {
        let response : StopResponse = {
            createdEntry:  timeEntry,
            totalCoins: res.locals.user.totalCoins
        }

 
        res.status(StatusCodes.CREATED)
        .json(response);
    })
    .catch(() => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({message: "Unable to stop timer"});
    })
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
    hex : string, 
}
interface createProjectResponse  {
    projectId: string;
}
timeEntryController.post('/project', (req : Request, res: Response) => {
    let body : createProjectRequest = req.body;

    let idPromise = timeEntryService.createProject(res.locals.user, body.name, body.hex);
    idPromise
    .then((id) => {
        let response : createProjectResponse = {
            projectId: id
        }

        res.status(StatusCodes.CREATED)
        .json(response);
    }).catch(() => {
        res.status(StatusCodes.NOT_FOUND)
            .json({messsage: `Could not create projects for user ${res.locals.user.id}`});
    });
   
   
});

interface getProjectResponse {
    projects : Project[];
}
timeEntryController.get('/project', (req : Request, res: Response) => {

    timeEntryService.getProjects(res.locals.user)
    .then(projects => {
        let getProjectResponse = {
            projects : projects
        }
        res.status(StatusCodes.OK)
            .json(getProjectResponse);
    })
    .catch(() => {
        res.status(StatusCodes.NOT_FOUND)
        .json({messsage: `Could not find projects for user ${res.locals.user.id}`});
    })
    ;

})

export { timeEntryController };