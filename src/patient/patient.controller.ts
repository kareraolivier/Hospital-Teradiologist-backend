import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Req,
  Param,
  Query,
} from "@nestjs/common";
import { Roles } from "src/auth/role/roles.decorator";
import { Role } from "src/auth/enums/enum";
import { PatientService } from "./patient.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Patient } from "./interface/patient.interface";
import { Query as ExpressQuery } from "express-serve-static-core";
import { patientDto, updatePatientDto } from "./dto/patient.dto";
import { patientCountDto } from "src/radiology/dto/radiology.dto";
import { Radiology } from "src/radiology/interface/radiology.interface";

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
  async findAll(
    @Param("patientId") patientId,
    @Query() query: ExpressQuery,
  ): Promise<{ data: Patient[]; totalPages: number }> {
    return await this.patientService.getAllPatient(patientId, query);
  }

  @Get(":id")
  async findOne(
    @Param("id") id,
  ): Promise<{ radiology: Radiology; patient: Patient }> {
    return await this.patientService.findOne(id);
  }

  @Post()
  @Roles(Role.Radiologist, Role.Admin)
  async createPatient(@Body() patientDto: patientDto, @Req() req: any) {
    const patient = {
      ...patientDto,
      userId: req.user.id,
      userName: req.user.name,
    };
    return this.patientService.createPatient(patient);
  }

  @Delete(":id")
  delete(@Param("id") id): Promise<Patient> {
    return this.patientService.delete(id);
  }
  @Patch("specialist/:id")
  @Roles(Role.Specialist, Role.Admin)
  specialistUpdate(
    @Body() updatePatientDto: updatePatientDto,
    @Param("id") id,
    @Req() req: any,
  ): Promise<Patient> {
    const patient = {
      ...updatePatientDto,
      specialistId: req.user.id,
      specialistName: req.user.name,
    };
    return this.patientService.specialistUpdate(id, patient);
  }
}
