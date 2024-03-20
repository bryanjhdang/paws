import { Request, NextFunction, Response } from "express";
import { AccountHelper } from "../helpers/interface/account.helper";
import { oAuthHelper } from "../helpers/oAuth.helper";



export function authenticate(req : Request, res : Response, next : NextFunction) {
    const accountHelper : AccountHelper  = oAuthHelper;
    accountHelper.getUser("nemLmP1npemf5VSzAKRC").then(user => {
        res.locals.user = user;
        next();
    }); 
}