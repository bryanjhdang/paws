import express, { Express, Request, Response, Router } from "express";
import * as ReportController from "../controllers/timeEntry.controller";

const timeEntryRouter : Router = express.Router();

timeEntryRouter.post(`/start`, ReportController.start);

timeEntryRouter.post('/upload', ReportController.upload);

export { timeEntryRouter };