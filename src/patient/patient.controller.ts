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
import { PatientService } from "./patient.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Patient } from "./interface/patient.interface";
import { patientDto } from "./dto/patient.dto";

@ApiBearerAuth("JWT-auth")
@Controller("patient")
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  async findAll(): Promise<Patient[]> {
    return await this.patientService.getAllPatient();
  }

  @Post()
  async createPatient(@Body() patientDto: patientDto, @Req() req: any) {
    const patient = { ...patientDto, userId: req.user.id };
    return this.patientService.createPatient(patient);
  }
  @Delete(":id")
  delete(@Param("id") id): Promise<Patient> {
    return this.patientService.delete(id);
  }
}
