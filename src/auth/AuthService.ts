import axios from "axios";
import type { ApiResponse } from "../api/ApiResponse";
import type { AuthResponse } from "./AuthResponse";

export class AuthService {
  private readonly _api: axios.AxiosInstance;

  constructor() {
    this._api = axios.create({
      baseURL: "http://localhost:5000/api",
      timeout: 10_000,
    });
  }

  public async signIn(
    login: string,
    password: string,
  ): Promise<ApiResponse<AuthResponse>> {
    if (login.length === 0) {
      throw new Error("Login is required");
    }

    if (password.length === 0) {
      throw new Error("Password is required");
    }

    const response = await this._api.post<ApiResponse<AuthResponse>>(
      "/auth/sign-in",
      { login, password },
    );

    return response.data;
  }
}
