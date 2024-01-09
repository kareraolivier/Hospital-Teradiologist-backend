import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { User } from "./interface/user.interface";
import { UsersService } from "./users.service";
import { userDto } from "./dto/user.dto";
import { Public } from "src/auth/auth.ispublic";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth("JWT-auth")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Public()
  @Post()
  registerUser(@Body() userDto: userDto): Promise<User> {
    return this.usersService.registerUser(userDto);
  }

  @Get(":id")
  getUserById(@Param("id") id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Delete(":id")
  delete(@Param("id") id: string): Promise<User> {
    return this.usersService.delete(id);
  }

  @Patch(":id")
  update(@Body() updateteUserDto: userDto, @Param("id") id): Promise<User> {
    return this.usersService.update(id, updateteUserDto);
  }

  @Patch("/stop/:id")
  stopUser(@Param("id") id: string): Promise<User> {
    return this.usersService.stopUser(id);
  }
}
