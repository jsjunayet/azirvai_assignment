export enum USER_ROLE {
  OWNER = "ADMIN",
}

export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IVerifiedLoginUser = {
  userId: string;
  role: USER_ROLE;
};

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};
