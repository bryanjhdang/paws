import * as dotenv from "dotenv";
import { Request, NextFunction, Response } from "express";
import { AccountHelper } from "../helpers/interface/account.helper";
import { oAuthHelper } from "../helpers/oAuth.helper";
import {
  auth,
  claimCheck,
  InsufficientScopeError,
} from "express-oauth2-jwt-bearer";

dotenv.config();

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const accountHelper: AccountHelper = oAuthHelper;

  const auth = req.auth;
  // console.log(auth?.header);
  console.log(auth?.payload.sub);

  if (auth?.payload.sub) {
    accountHelper.getUser(auth.payload.sub).then((user) => {
      res.locals.user = user;
      next();
    });
  } else {
    return res
      .status(401)
      .json({ message: "Authorization token not provided" });
  }
}

export const validateAccessToken = auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  audience: process.env.AUTH0_AUDIENCE,
});

export const checkRequiredPermissions = (requiredPermissions: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const permissionCheck = claimCheck((payload) => {
      const permissions = payload.permissions as string[];

      const hasPermissions = requiredPermissions.every((requiredPermission) =>
        permissions.includes(requiredPermission)
      );

      if (!hasPermissions) {
        throw new InsufficientScopeError();
      }

      return hasPermissions;
    });

    permissionCheck(req, res, next);
  };
};
