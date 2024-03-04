import { Module } from "@nestjs/common";
import { PatientService } from "./patient.service";
import { MongooseModule } from "@nestjs/mongoose";
import { PatientController } from "./patient.controller";
import { PatientSchema } from "./schemas/patient.schema";
import { RadiologyModule } from "src/radiology/radiology.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Patient", schema: PatientSchema }]),
    RadiologyModule,
  ],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService, RadiologyModule],
})
export class PatientModule {}
