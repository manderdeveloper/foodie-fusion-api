import * as jwt from 'jsonwebtoken';

import { injectable } from "inversify";
import { User } from '@domain/model/User';
import { AuthTokenService } from '@domain/service/AuthTokenService';

@injectable()
export class JWTAuthTokenService implements AuthTokenService {
  generateToken(user: User): string {
    const payload = {
      userId: user.id,
      userEmail: user.email
    }
    const options = { expiresIn: '8h'};
    return jwt.sign(payload, process.env.JWT_SECRET, options);
  }

  verifyToken(authToken: string): string {
    const decodedUser = jwt.verify(authToken, process.env.JWT_SECRET) as {userId: {value:string}, userEmail: Object};
    const userId = decodedUser.userId ? decodedUser.userId.value : '';
    return userId;
  }
}