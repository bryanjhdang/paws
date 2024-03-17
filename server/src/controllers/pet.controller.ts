import express, { Request, Response, Router } from "express";
import { petService } from "../services/pet.service";
import { StatusCodes } from "http-status-codes";
import { Pet } from "../models/Pet";

const petController: Router = express.Router();


interface GetCoinsRequest {

}
interface GetCoinsResponse {
    coins : number
}
petController.get('/coins', (req: Request, res: Response) => {
    let getCoinsResponse : GetCoinsResponse = {
        coins : petService.getCoins(res.locals.user)
    }
    return res.status(StatusCodes.OK)
        .json(getCoinsResponse)
});

interface PostCoinsRequest {
    addedCoins: number
}

interface PostCoinsResponse {
    newCoinCount: number
}
petController.post('/coins', (req: Request, res: Response) => {
    let body : PostCoinsRequest = req.body;

    petService.addCoins(res.locals.user, body.addedCoins);

    let response : PostCoinsResponse = {
        newCoinCount : petService.getCoins(res.locals.user)
    }

    return res.status(StatusCodes.OK)
        .json(response);
});

interface GetInfoRequest {

}
interface GetInfoResponse extends Pet {
}
petController.get('/info', (req: Request, res: Response) => {
    let response : GetInfoResponse = petService.getPet(res.locals.user);

    return res.status(StatusCodes.OK)
        .json(response);
})






export { petController };