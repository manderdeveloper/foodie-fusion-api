import { User } from "../model/User";

export interface AuthTokenService {
  generateToken(user: User): string;
  verifyToken(authToken: string): string;
}