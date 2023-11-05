import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Patch,
  Param,
} from "@nestjs/common";
import { Radiology } from "./interface/radiology.interface";
import { RadiologyService } from "./radiology.service";
import { radiologyDto } from "./dto/radiology.dto";
import { Roles } from "src/auth/role/roles.decorator";
import { Role } from "src/auth/enums/role.enum";

@Controller("radiology")
export class RadiologyController {
  constructor(private readonly radiologyService: RadiologyService) {}
  @Get()
  @Roles(Role.Radiologist)
  @Roles(Role.Admin)
  findAll(): Promise<Radiology[]> {
    return this.radiologyService.findAll();
  }
  @Post()
  create(@Body() radiologyDto: radiologyDto): Promise<Radiology> {
    return this.radiologyService.create(radiologyDto);
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
    @Body() updatetePatientDto: radiologyDto,
    @Param("id") id,
  ): Promise<Radiology> {
    return this.radiologyService.update(id, updatetePatientDto);
  }
}
