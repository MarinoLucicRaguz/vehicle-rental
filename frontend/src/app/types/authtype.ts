export type LoginDTO = {
  username: string;
  password: string;
};

export type RegisterDTO = {
  username: string;
  password: string;
  confirmpassword: string;
};

export type AccessTokenResponse = {
  tokenType?: string | null;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
};
