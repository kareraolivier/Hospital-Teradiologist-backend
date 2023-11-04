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
import { Public } from "./auth.ispublic";
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  signIn(@Body() login: userDto): Promise<any> {
    return this.authService.signIn(login);
  }
}
