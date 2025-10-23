"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const jwt_1 = require("../../utils/jwt");
const db_1 = require("../../config/db");
const http_status_1 = __importDefault(require("http-status"));
// import { envVars } from "../config/env";
// import AppError from "../errorHelpers/AppError";
// import { verifyToken } from "../utils/jwt";
// import { User } from "../modules/user/user.model";
// import httpStatus from "http-status-codes";
// import { IsActive } from "../modules/user/user.interface";
const checkAuth = (...authRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const accessToken = req.headers.authorization || ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken);
        console.log("check auth", accessToken);
        if (!accessToken) {
            throw new AppError_1.default(403, "No Token Received");
        }
        const verifiedToken = (yield (0, jwt_1.verifyToken)(accessToken, process.env.ACCESS_TOKEN_SECRET || "access-secret"));
        console.log("very auth", verifiedToken);
        const isUserExist = yield db_1.prisma.user.findFirst({
            where: {
                email: verifiedToken.email,
            },
        });
        console.log("check auth user", isUserExist);
        if (!isUserExist) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User does not exist");
        }
        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError_1.default(403, "You are not permitted to view this route!!!");
        }
        req.owner = verifiedToken;
        next();
    }
    catch (error) {
        console.log("jwt error", error);
        next(error);
    }
});
exports.checkAuth = checkAuth;
