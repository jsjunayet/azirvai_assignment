import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../../utils/jwt";
import { prisma } from "../../config/db";
import httpStatus from "http-status";

// import { envVars } from "../config/env";
// import AppError from "../errorHelpers/AppError";
// import { verifyToken } from "../utils/jwt";
// import { User } from "../modules/user/user.model";
// import httpStatus from "http-status-codes";
// import { IsActive } from "../modules/user/user.interface";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization || req.cookies?.accessToken;
      console.log("check auth", accessToken);

      if (!accessToken) {
        throw new AppError(403, "No Token Received");
      }
      const verifiedToken = (await verifyToken(
        accessToken,
        (process.env.ACCESS_TOKEN_SECRET as string) || "access-secret"
      )) as JwtPayload;
      console.log("very auth", verifiedToken);
      const isUserExist = await prisma.user.findFirst({
        where: {
          email: verifiedToken.email,
        },
      });

      console.log("check auth user", isUserExist);
      if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
      }

      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(403, "You are not permitted to view this route!!!");
      }

      req.owner = verifiedToken;
      next();
    } catch (error) {
      console.log("jwt error", error);
      next(error);
    }
  };
