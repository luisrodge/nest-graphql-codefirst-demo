import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/users/models/user';
import { UsersService } from 'src/users/users.service';
import { jwtSecret } from './constants';
import { AuthLoginInput } from './dto/input/auth-login.input';
import { UserToken } from './dto/user-token';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  validate(email: string, password: string): User | null {
    const user = this.usersService.getUserByEmail(email);

    if (!user) return null;

    // compare passwords
    const passwordIsValid = password === user.password;
    return passwordIsValid ? user : null;
  }

  login(user: User): UserToken {
    const payload = { email: user.email, sub: user.userId };

    return { access_token: this.jwtService.sign(payload) };
  }

  public gqlLogin(input: AuthLoginInput): UserToken {
    const user = this.validate(input.email, input.password);

    if (!user) throw new UnauthorizedException();

    const payload = { email: user.email, sub: user.userId };

    return { access_token: this.jwtService.sign(payload) };
  }

  verify(token: string): User {
    const decoded = this.jwtService.verify(token, { secret: jwtSecret });
    const user = this.usersService.getUserByEmail(decoded.email);

    if (!user) {
      throw new Error('Unable to get user from decoded token');
    }

    return user;
  }
}
