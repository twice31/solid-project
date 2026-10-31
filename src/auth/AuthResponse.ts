export interface AuthResponse {
  user: {
    id: string;
    login: string;
    createdAt: string;
  };
  token: {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: string;
    refreshTokenExpiresAt: string;
  };
}
