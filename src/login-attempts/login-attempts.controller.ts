import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { LoginAttemptsService } from "./login-attempts.service";
import { CreateLoginAttemptDto } from "./dto/create-login-attempt.dto";
import { Role } from "src/auth/enums/enum";
import { Roles } from "src/auth/role/roles.decorator";
@Roles(Role.Admin)
@Controller("login-attempts")
export class LoginAttemptsController {
  constructor(private readonly loginAttemptsService: LoginAttemptsService) {}

  @Post()
  create(@Body() createLoginAttemptDto: CreateLoginAttemptDto) {
    return this.loginAttemptsService.create(createLoginAttemptDto);
  }

  @Get()
  findAll() {
    return this.loginAttemptsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.loginAttemptsService.findOne(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.loginAttemptsService.remove(id);
  }
}
