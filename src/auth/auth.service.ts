import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bycrpt from "bcrypt";
import { UsersService } from "src/users/users.service";
import { Login } from "./interface/login.interface";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { LoginAttemptsService } from "src/login-attempts/login-attempts.service";
import { LoginAttempt } from "src/login-attempts/interface/login-attempt.interface";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private loginAttemptsService: LoginAttemptsService,
  ) {}
  async signIn(login: Login, request: Request): Promise<any> {
    const { email, password } = login;
    const loginUser = await this.usersService.getUserByEmail(email);

    const ipAddress =
      request.headers["x-forwarded-for"] ||
      request.headers["x-real-ip"] ||
      request.headers["x-forwarded-for"] ||
      request.socket.remoteAddress ||
      request.ip ||
      "";

    const createLoginAttempt: LoginAttempt = {
      user: loginUser ? loginUser.id : null,
      ipAddress,
      successful: false,
    };
    if (!loginUser || loginUser.isActive === false) {
      throw new UnauthorizedException("No user found");
    }
    const validPassword = await bycrpt.compare(password, loginUser.password);
    if (!validPassword) {
      await this.loginAttemptsService.create(createLoginAttempt);
      throw new UnauthorizedException("Wrong password");
    }

    createLoginAttempt.successful = true;
    await this.loginAttemptsService.create(createLoginAttempt);

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
    return user;
  }
}
