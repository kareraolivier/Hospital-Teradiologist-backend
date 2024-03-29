import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bycrpt from "bcrypt";
import { UsersService } from "src/users/users.service";
import { Login } from "./interface/login.interface";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(login: Login): Promise<any> {
    const { email, password } = login;
    const loginUser = await this.usersService.getUserByEmail(email);
    if (!loginUser || loginUser.isActive === false) {
      throw new UnauthorizedException("No user found");
    }
    const validPassword = await bycrpt.compare(password, loginUser.password);
    if (!validPassword) {
      throw new UnauthorizedException("Wrong password");
    }
    const user = {
      token: await this.jwtService.signAsync({
        id: loginUser.id,
        name: `${loginUser.firstName} ${loginUser.lastName}`,
        email: loginUser.email,
        role: loginUser.role,
      }),
      user: {
        id: loginUser.id,
        email: loginUser.email,
        names: `${loginUser.firstName} ${loginUser.lastName}`,
        role: loginUser.role,
      },
    };
    return loginUser && validPassword ? user : null;
  }
}
