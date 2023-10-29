import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "src/users/interface/user.interface";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }
  async validate(user: User): Promise<any> {
    user.email = user.email.toLowerCase();
    user.password = user.password;
    const loginUser = await this.authService.signIn(user);
    if (!loginUser) {
      throw new UnauthorizedException();
    }
    return loginUser;
  }
}
