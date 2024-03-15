import express, { Express, Request, Response, Router } from "express";
import * as AccountController from "../controllers/account.controller";

const accountRouter : Router = express.Router();

// Login
accountRouter.post(`/login`, AccountController.login);

// Create User
accountRouter.post('/create', AccountController.create);

export { accountRouter };