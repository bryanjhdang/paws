// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server, Socket } from "socket.io"

import { petController } from "./controllers/pet.controller";
import { timeEntryController } from "./controllers/timeEntry.controller";
import { accountController } from "./controllers/account.controller";
import { authenticate } from "./middlewares/auth.middleware";
import { wsInit } from "./ws";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;
const wsPort = process.env.WS_PORT || 8081;
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(cors());
app.use(express.json());

app.get(`/`, (req: Request, res: Response) => {
  res.send("It's working!");
});

app.use(authenticate);

app.use('/account', accountController);

app.use('/timeEntry', timeEntryController);

app.use('/pet', petController);

wsInit(io);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

server.listen(wsPort, () => {
  console.log(`[socket]: Socket listening on http://localhost:${wsPort}`);
});