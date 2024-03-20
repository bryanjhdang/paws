import express, { Request, Response, Router } from "express";
import { accountService } from "../services/account.service";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/User";

const accountController: Router = express.Router();

interface getUserInfoResponse extends User {};
accountController.get('/', (req : Request, res : Response) => {
    const id = req.query.id;
    if (!id) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
            .json("message : Missing id field in query");
    }

    let userPromise = accountService.getUserInfo(id.toString());
    userPromise
    .then(user => {
        res.status(StatusCodes.OK)
        .json(user);
    })
    .catch(() => {
        res.status(StatusCodes.NOT_FOUND)
            .json({messsage: `Missing could not find user ${id}`});
    });
})

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