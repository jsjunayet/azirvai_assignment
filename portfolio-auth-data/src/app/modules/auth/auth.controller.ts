import { Request, Response } from "express";
import { sendResponse } from "../../../shared/sendResponse";
import { IRefreshTokenResponse } from "./auth.interface";
import { AuthService } from "./auth.service";

const loginWithEmailAndPassword = async (req: Request, res: Response) => {
  const result = await AuthService.loginWithEmailAndPassword(req.body);
  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: "Logged in successfully!",
    data: result,
  });
};
const getME = async (req: Request, res: Response) => {
  const id = req.owner.id;
  const result = await AuthService.getMe(id);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "GET ME in successfully!",
    data: result,
  });
};

export const AuthController = {
  loginWithEmailAndPassword,
  getME,
};
