import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../../config/db";
import { ILoginUser, ILoginUserResponse } from "./auth.interface";

const loginWithEmailAndPassword = async (
  payload: ILoginUser
): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    throw new Error("user not found");
  }

  const isPasswordValid = await bcrypt.compare(
    password as string,
    existingUser.password
  );
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const accessToken = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
      name: existingUser.name,
    },
    (process.env.ACCESS_TOKEN_SECRET as string) || "access-secret",
    {
      expiresIn: "7d",
    }
  );

  const refreshToken = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,

      name: existingUser.name,
    },
    (process.env.REFRESH_TOKEN_SECRET as string) || "refresh-secret",
    {
      expiresIn: "7d",
    }
  );

  return {
    accessToken,
    refreshToken,
  };
};

const authWithGoogle = async (data: Prisma.UserCreateInput) => {
  let user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data,
    });
  }

  return user;
};
const getMe = async (id: string) => {
  let user = await prisma.user.findUnique({
    where: { id: id },
  });
  return user;
};
export const AuthService = {
  loginWithEmailAndPassword,
  authWithGoogle,
  getMe,
};
