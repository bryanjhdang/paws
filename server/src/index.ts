// src/index.js
import express, { Express, Request, Response } from "express";
import { createServer } from 'node:http';
import dotenv from "dotenv";
import cors from "cors";
import { Server, Socket } from "socket.io"

import { petController } from "./controllers/pet.controller";
import { timeEntryController } from "./controllers/timeEntry.controller";
import { accountController } from "./controllers/account.controller";
import { todoController } from "./controllers/todo.controller";
import { signupController } from "./controllers/signup.controller";
import { authenticate } from "./middlewares/auth.middleware";

import {
  checkRequiredPermissions,
  validateAccessToken,
} from "./middlewares/auth.middleware";
import { errorHandler } from "./middlewares/error.middleware";
import { wsInit } from "./ws";

dotenv.config();



const app: Express = express();

const port = process.env.PORT || 8080;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }}
);


app.use(cors());
app.use(express.json());

app.get(`/`, (req: Request, res: Response) => {
  res.send("It's working!");
});

// app.post('/newUserFromAuth', (req : Request, res : Response) => {
//   let user = new User(req.body.nickname, new Pet(), new NoRunning(), 0, req.body.id);
//   const id = firestoreHelper.addUser(user);
//   res.send('YES');
// });

app.use('/signup', signupController);

app.use(validateAccessToken);
app.use(authenticate);

app.use('/account', accountController);

app.use('/timeEntry', timeEntryController);

app.use('/pet', petController);

app.use('/todo', todoController)

app.use(errorHandler);

app.use('/todo', todoController)

app.use(errorHandler);

wsInit(io);

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});