import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Patch,
  Param,
  Req,
} from "@nestjs/common";
import { Radiology } from "./interface/radiology.interface";
import { RadiologyService } from "./radiology.service";
import { radiologyDto, specialistRadiologyDto } from "./dto/radiology.dto";
import { Roles } from "src/auth/role/roles.decorator";
import { Role } from "src/types/enum";

@Controller("radiology")
export class RadiologyController {
  constructor(private readonly radiologyService: RadiologyService) {}
  @Get()
  findAll(): Promise<Radiology[]> {
    return this.radiologyService.findAll();
  }
  @Post()
  @Roles(Role.Radiologist, Role.Admin)
  create(
    @Body() radiologyDto: radiologyDto,
    @Req() req: any,
  ): Promise<Radiology> {
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

  @Patch("specialist/:id")
  @Roles(Role.Specialist, Role.Admin)
  specialistUpdate(
    @Body() updatetePatientDto: specialistRadiologyDto,
    @Param("id") id,
  ): Promise<Radiology> {
    return this.radiologyService.specialistUpdate(id, updatetePatientDto);
  }
}
