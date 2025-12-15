import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "src/users/interface/user.interface";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { Request } from "express";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }
  async validate(user: User, request: Request): Promise<any> {
    user.email = user.email.toLowerCase();
    user.password = user.password;
    const loginUser = await this.authService.signIn(user, request);
    if (!loginUser) {
      throw new UnauthorizedException();
    }
    return loginUser;
  }
}
