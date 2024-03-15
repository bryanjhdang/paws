// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { accountRouter } from "./routes/account.route";
import { timeEntryRouter } from "./routes/timeEntry.route";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());


app.use('/account', accountRouter);

app.use('/entry', timeEntryRouter);



app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});