import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Patient } from "./interface/patient.interface";
import { Model } from "mongoose";

@Injectable()
export class PatientService {
  constructor(
    @InjectModel("Patient") private readonly patientModel: Model<Patient>,
  ) {}

  async getAllPatient(): Promise<Patient[]> {
    return await this.patientModel.find();
  }

  async createPatient(patient: Patient): Promise<Patient> {
    const newPatient = new this.patientModel(patient);
    return newPatient.save();
  }
  async delete(id: string): Promise<Patient> {
    return await this.patientModel.findByIdAndRemove({ _id: id });
  }
}
