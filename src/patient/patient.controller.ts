import { Controller, Get, Post, Patch, Delete } from "@nestjs/common";
import { PatientService } from "./patient.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Patient } from "./interface/patient.interface";

@ApiBearerAuth("JWT-auth")
@Controller("patient")
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  async findAll(): Promise<Patient[]> {
    return this.patientService.getAllPatient();
  }
}
