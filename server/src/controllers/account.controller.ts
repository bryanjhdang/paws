import { NextFunction, Request, Response } from "express";
import { accountService } from "../services/account.service";
import { StatusCodes } from "http-status-codes";
import { CreateUserBody, LoginBody } from "../models/RequestBody";
import { LoginResult } from "../models/ResponseBody";

export async function login(req: Request, res: Response) {
        let body : LoginBody = req.body

    
        let returnCookie : LoginResult = {
            cookie : accountService.validate(body.username, body.hashedPassword)
        };

        
        res.status(StatusCodes.ACCEPTED)
            .json(returnCookie);       
}

export async function create(req: Request, res: Response)  {
        let body : CreateUserBody = req.body;

        // code for checking request bodies, may not use because it's a bit unwieldy, might switch to a proper middleware later
        if (!(body.username && body.hashedPassword && body.name)) {
            console.log("Expected CreateUserBody got\n", body);
            return res.status(StatusCodes.BAD_REQUEST).send({message: "Incorrectly formatted body"});
        }

        let returnCookie : LoginResult = {
            cookie : accountService.createUser(body.username, body.hashedPassword, body.name)
        };

        
        res.status(StatusCodes.CREATED)
            .json(returnCookie);
}
