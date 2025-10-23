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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../../../config/db");
const loginWithEmailAndPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const existingUser = yield db_1.prisma.user.findUnique({
        where: { email },
    });
    if (!existingUser) {
        throw new Error("user not found");
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, existingUser.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
    const accessToken = jsonwebtoken_1.default.sign({
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
        name: existingUser.name,
    }, process.env.ACCESS_TOKEN_SECRET || "access-secret", {
        expiresIn: "7d",
    });
    const refreshToken = jsonwebtoken_1.default.sign({
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
        name: existingUser.name,
    }, process.env.REFRESH_TOKEN_SECRET || "refresh-secret", {
        expiresIn: "7d",
    });
    return {
        accessToken,
        refreshToken,
    };
});
const authWithGoogle = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield db_1.prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (!user) {
        user = yield db_1.prisma.user.create({
            data,
        });
    }
    return user;
});
const getMe = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield db_1.prisma.user.findUnique({
        where: { id: id },
    });
    return user;
});
exports.AuthService = {
    loginWithEmailAndPassword,
    authWithGoogle,
    getMe,
};
