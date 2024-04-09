import express, { Request, Response, Router } from "express";
import { accountService } from "../services/account.service";
import { StatusCodes } from "http-status-codes";
import { NoRunning, User } from "../models/User";
import { Pet } from "../models/Pet";
import { firestoreHelper } from "../helpers/firestore.helper";

const signupController: Router = express.Router();

signupController.post('/', (req: Request, res: Response) => {
  // const name = req.body.name;
  // const nickname = req.body.nickname;
  const userId = req.body.user_id;
  const email = req.body.email;
  console.log("req from auth: making new user");

  if (!email) {
    return res.status(StatusCodes.BAD_REQUEST).json("message : Missing email field in body");
  }
  
  if (!userId) {
    return res.status(StatusCodes.BAD_REQUEST).json("message : Missing userId field in body");
  }

  let user = new User(email, new Pet(), new NoRunning(), 0, userId);
  const id = firestoreHelper.addUser(user);
})


export { signupController };