import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Req,
  Param,
} from "@nestjs/common";
import { Roles } from "src/auth/role/roles.decorator";
import { Role } from "src/auth/enums/enum";
import { PatientService } from "./patient.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Patient } from "./interface/patient.interface";
import { patientDto } from "./dto/patient.dto";
import { patientCountDto } from "src/radiology/dto/radiology.dto";

@ApiBearerAuth("JWT-auth")
@Controller("patient")
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get("count")
  @Roles(Role.Radiologist, Role.Specialist, Role.Admin)
  countAll(): Promise<patientCountDto> {
    return this.patientService.countAll();
  }
  @Get("all/:patientId")
  async findAll(@Param("patientId") patientId): Promise<Patient[]> {
    return await this.patientService.getAllPatient(patientId);
  }

  @Get(":id")
  findOne(@Param("id") id): Promise<Patient> {
    return this.patientService.findOne(id);
  }

  @Post()
  @Roles(Role.Radiologist, Role.Admin)
  async createPatient(@Body() patientDto: patientDto, @Req() req: any) {
    const patient = { ...patientDto, userId: req.user.id };
    return this.patientService.createPatient(patient);
  }

  @Delete(":id")
  delete(@Param("id") id): Promise<Patient> {
    return this.patientService.delete(id);
  }
}
