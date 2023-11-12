import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { userDto } from "src/users/dto/user.dto";
import { loginDto } from "./dto/login.dto";
import { Public } from "./auth.ispublic";
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  signIn(@Body() login: loginDto): Promise<any> {
    return this.authService.signIn(login);
  }
}
