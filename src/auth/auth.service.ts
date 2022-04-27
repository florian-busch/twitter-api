import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(private userService: UserService,
    private jwtService: JwtService
    ) {}

    //TODO: change parameter username in authentication process to name for consistency reasons
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findUserForAuthentication(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user._doc.name, sub: user._doc._id };
    console.log(user._doc.name + ' ' + user._doc._id);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
