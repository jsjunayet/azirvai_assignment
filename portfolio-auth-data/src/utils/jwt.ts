import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const generateToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: string
) => {
  const token = jwt.sign(payload, secret, {
    expiresIn,
  } as SignOptions);

  return token;
};

export const verifyToken = async (token: string, secret: string) => {
  try {
    const verifiedToken = jwt.verify(token, secret);

    return verifiedToken;
  } catch (error) {
    console.log("verifyToken error", error);
  }
};