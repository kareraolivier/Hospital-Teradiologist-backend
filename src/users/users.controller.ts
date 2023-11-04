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
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  registerUser(@Body() userDto: userDto): Promise<User> {
    return this.usersService.registerUser(userDto);
  }

  @Get(":id")
  findOne(@Param("id") id): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(":id")
  delete(@Param("id") id): Promise<User> {
    return this.usersService.delete(id);
  }

  @Patch(":id")
  update(@Body() updateteUserDto: userDto, @Param("id") id): Promise<User> {
    return this.usersService.update(id, updateteUserDto);
  }
}
