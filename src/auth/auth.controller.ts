import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local.auth.guard";
import { userDto } from "src/users/dto/user.dto";
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  // @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post("login")
  signIn(@Body() login: userDto): Promise<any> {
    return this.authService.signIn(login);
  }
}
