import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  public async validateUser(username: string, pass: string) {
    const user = await this.usersService.findOne(username);
    if (user && user.password == pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.Id };
    return { access_token: this.authService.sign(payload);
    }
  }
}
