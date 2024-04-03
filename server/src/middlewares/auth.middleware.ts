import { Request, NextFunction, Response } from "express";
import { AccountHelper } from "../helpers/interface/account.helper";
import { oAuthHelper } from "../helpers/oAuth.helper";

export function authenticate(req : Request, res : Response, next : NextFunction) {
    const accountHelper : AccountHelper  = oAuthHelper;

    const auth = req.auth;
    // console.log(auth?.header);
    console.log(auth?.payload.sub);

    if (auth?.payload.sub) {
        accountHelper.getUser(auth.payload.sub).then(user => {
            res.locals.user = user;
            next();
        }); 
    } else {
        return res.status(401).json({message: 'Authorization token not provided'});
    }
    
}