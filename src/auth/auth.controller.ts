import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "express";
import { loginDto } from "./dto/login.dto";
import { Public } from "./auth.ispublic";
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  signIn(@Body() login: loginDto, @Req() request: Request): Promise<any> {
    return this.authService.signIn(login, request);
  }
}
