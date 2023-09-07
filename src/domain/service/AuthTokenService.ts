import { User } from "@domain/model/User";


export interface AuthTokenService {
  generateToken(user: User): string;
  verifyToken(authToken: string): string;
}