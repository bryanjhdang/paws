// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { petController } from "./controllers/pet.controller";
import { timeEntryController } from "./controllers/timeEntry.controller";
import { accountController } from "./controllers/account.controller";
import { authenticate } from "./middlewares/auth.middleware";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;
const address = process.env.ADDRESS || "localhost"

app.use(cors());
app.use(express.json());

app.use(authenticate);
app.use('/account', accountController);
app.use('/timeEntry', timeEntryController);
app.use('/pet', petController);


const path = require('path');
app.use(express.static(path.resolve(__dirname, "../build")));
const indexPath = path.resolve(__dirname, "../build", "index.html");

app.get("/", (req: Request, res: Response) => {
    res.sendFile(indexPath);
});
app.get("/timerPage", (req: Request, res: Response) => {
    res.sendFile(indexPath);
});
app.get("/petPage", (req: Request, res: Response) => {
    res.sendFile(indexPath);
});
app.get("/statisticsPage", (req: Request, res: Response) => {
    res.sendFile(indexPath);
});
app.get("/friendsPage", (req: Request, res: Response) => {
    res.sendFile(indexPath);
});
app.get("/profilePage", (req: Request, res: Response) => {
    res.sendFile(indexPath);
});
app.get("/settingsPage", (req: Request, res: Response) => {
    res.sendFile(indexPath);
});
app.get("/callback", (req: Request, res: Response) => {
    const code = req.query.code;
    console.log(code);
    res.sendFile(indexPath);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://${address}:${port}`);
});