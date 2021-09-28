import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { stringify } from 'querystring';

@Injectable()
export class AuthService {

  constructor(private userService: UserService
    ) {}

    //TODO: change parameter username in authentication process to name for consistency reasons
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findUserAuthentication(username)
    if (user && await bcrypt.compare(pass, user.password)) {
      const {password, ... result} = user;
      return result
    }
    return null
  }
}
