import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Patch,
  Param,
  Req,
  Query,
} from "@nestjs/common";
import { Radiology } from "./interface/radiology.interface";
import { RadiologyService } from "./radiology.service";
import { radiologyDto } from "./dto/radiology.dto";
import { Roles } from "src/auth/role/roles.decorator";
import { Role } from "src/auth/enums/enum";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Query as ExpressQuery } from "express-serve-static-core";
import { userDto } from "src/users/dto/user.dto";

@ApiBearerAuth("JWT-auth")
@Controller("radiology")
export class RadiologyController {
  constructor(private readonly radiologyService: RadiologyService) {}
  @Get()
  findAll(
    @Query() query: ExpressQuery,
  ): Promise<{ data: Radiology[]; totalPages: number }> {
    return this.radiologyService.findAll(query);
  }

  @Post()
  @Roles(Role.Radiologist, Role.Admin)
  create(
    @Body() radiologyDto: radiologyDto,
    @Req() req: any,
  ): Promise<Radiology> {
    const user = <userDto>req.user;
    return this.radiologyService.create(user, radiologyDto);
  }

  @Get(":id")
  findOne(@Param("id") id): Promise<Radiology> {
    return this.radiologyService.findOne(id);
  }

  @Delete(":id")
  delete(@Param("id") id): Promise<Radiology> {
    return this.radiologyService.delete(id);
  }

  @Patch(":id")
  update(
    @Body() updatePatientDto: radiologyDto,
    @Param("id") id,
  ): Promise<Radiology> {
    return this.radiologyService.update(id, updatePatientDto);
  }
}
