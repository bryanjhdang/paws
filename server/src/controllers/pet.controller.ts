import express, { Request, Response, Router } from "express";
import { petService } from "../services/pet.service";
import { StatusCodes } from "http-status-codes";
import { Pet } from "../models/Pet";
import { error } from "console";

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
petController.get('/', (req: Request, res: Response) => {
    let response : GetInfoResponse = petService.getPet(res.locals.user);

    return res.status(StatusCodes.OK)
        .json(response);
})

petController.patch('/equip', (req: Request, res: Response) => {
    try {
        var query = {
            restId: req.query.restId ? parseInt(req.query.restId.toString()) : 0,
            workId : req.query.workId ? parseInt(req.query.workId.toString()) : 0
        } 
    } catch (err) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
            .json({message : "Invalid parameters for query string!", error : err});
    }

    petService.equipPet(res.locals.user, query.workId, query.restId)
    .then(() => {
        res.status(StatusCodes.OK)
        .json(res.locals.user);
    })
    .catch((error : Error) => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({message : "Unable to equip pet", error : error.message});
    });
})

petController.put('/buy', (req: Request, res: Response) => {
    try {
        if (req.query.id  && req.query.cost) {
            var query = {
                id :  parseInt(req.query.id.toString()),
                cost : parseInt(req.query.cost.toString())
            } 
        } else {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
            .json({message : "Missing cost or id!"});
        }

    } catch (err) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
            .json({message : "Invalid parameters for query string!", error : err});
    }

    petService.buyPet(res.locals.user, query.id, query.cost)
    .then(() => {
        res.status(StatusCodes.OK)
        .json(res.locals.user);
    })
    .catch((error : Error) => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({message : "Unable to purchase pet", error : error});
    });
})





export { petController };