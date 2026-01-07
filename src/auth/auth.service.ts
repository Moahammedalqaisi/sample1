import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
//import type { IUserService } from '../users/user.service';

//import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IUserService')
    private usersService: IUserService,
    private jwtService: JwtService,
  ) {}
  private readonly saltRounds = 10;

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);

    //const hashPass = await bcrypt.hash(pass, this.saltRounds);
    // const salt = await bcrypt.genSalt(this.saltRounds);
    // const hash = await bcrypt.hash(pass, salt);
    // console.log(`password :${user?.password}`);
    // console.log(`hashPass :${hash}`);
    // if (user?.password !== hash) {
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
