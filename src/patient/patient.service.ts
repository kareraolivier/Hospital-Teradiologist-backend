import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Patient } from "./interface/patient.interface";
import { Model } from "mongoose";

@Injectable()
export class PatientService {
  constructor(
    @InjectModel("Patient") private readonly patientMOdel: Model<Patient>,
  ) {}

  async getAllPatient(): Promise<Patient[]> {
    return await this.patientMOdel.find();
  }
}
