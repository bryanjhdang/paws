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
    .catch((err : Error) => {
        res.status(StatusCodes.NOT_FOUND)
            .json(err);
    });
})

interface CreateRequest {
    email: string;
    name: string;
}
interface CreateResponse {
    id: string;
}
accountController.post('/start', (req: Request, res: Response) => {
    let body: CreateRequest = req.body;

    accountService.createUser(body.email, body.name)
    .then((id) => {
        let response: CreateResponse = {
            id: id
        };
        res.status(StatusCodes.CREATED)
        .json(response);
    })
    .catch((err : Error) => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(err);
    });




});


export { accountController };