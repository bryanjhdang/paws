import express, { Request, Response, Router } from "express";
import { accountService } from "../services/account.service";
import { StatusCodes } from "http-status-codes";

const accountController: Router = express.Router();


interface CreateRequest {
    username: string;
    name: string;
}
interface CreateResponse {

}
accountController.post('/create', (req: Request, res: Response) => {
    let body: CreateRequest = req.body;

    let returnCookie: CreateResponse = {
        cookie: accountService.createUser(body.username, body.name)
    };


    res.status(StatusCodes.CREATED)
        .json(returnCookie);
});


export { accountController };