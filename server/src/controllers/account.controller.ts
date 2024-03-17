import express, { Request, Response, Router } from "express";
import { accountService } from "../services/account.service";
import { StatusCodes } from "http-status-codes";

const accountController: Router = express.Router();


interface LoginRequest {
    username: string;
    hashedPassword: string;
}
interface LoginResponse {
    cookie: String;
}
accountController.post('/login', (req: Request, res: Response) => {
    let body: LoginRequest = req.body


    let returnCookie: LoginResponse = {
        cookie: accountService.validate(body.username, body.hashedPassword)
    };


    res.status(StatusCodes.ACCEPTED)
        .json(returnCookie);
});


interface CreateRequest {
    username: string;
    hashedPassword: string;
    name: string;
}
interface CreateResponse {

}
accountController.post('/create', (req: Request, res: Response) => {
    let body: CreateRequest = req.body;

    // code for checking request bodies, may not use because it's a bit unwieldy, might switch to a proper middleware later
    if (!(body.username && body.hashedPassword && body.name)) {
        console.log("Expected CreateUserBody got\n", body);
        return res.status(StatusCodes.BAD_REQUEST).send({ message: "Incorrectly formatted body" });
    }

    let returnCookie: LoginResponse = {
        cookie: accountService.createUser(body.username, body.hashedPassword, body.name)
    };


    res.status(StatusCodes.CREATED)
        .json(returnCookie);
});


export { accountController };