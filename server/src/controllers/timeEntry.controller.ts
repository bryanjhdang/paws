import express, { Request, Response, Router } from "express";
import { timeEntryService } from "../services/timeEntry.service";

const timeEntryController : Router = express.Router();

interface StartRequest {

}
interface StartResponse {

}
timeEntryController.post(`/start`, (req: Request, res: Response) => {

});


interface StopRequest {

}
interface StopResponse {

}
timeEntryController.post('/stop', (req: Request, res: Response) => {

});

interface uploadRequest {

}
interface uploadResponse {

}
timeEntryController.post('/upload', (req: Request, res: Response) => {

});

export { timeEntryController };