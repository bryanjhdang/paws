import express, { Request, Response, Router } from "express";

const petController: Router = express.Router();


interface PostCoinsRequest {

}

interface PostCoinsResponse {

}
petController.post('/coins', (req: Request, res: Response) => {

});

interface GetInfoRequest {

}
interface GetInfoResponse {

}
petController.get('/info', (req: Request, res: Response) => {

})


interface GetCoinsRequest {

}
interface GetCoinsResponse {

}
petController.get('/coins', (req: Request, res: Response) => {

});



export { petController };