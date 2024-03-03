import { Injectable, NotFoundException } from "@nestjs/common";
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
  async findOne(id: string): Promise<Patient> {
    const patient = await this.patientModel.findOne({ _id: id });
    if (!patient) throw new NotFoundException("Patiant not found");
    return patient;
  }
  async createPatient(patient: Patient): Promise<Patient> {
    const newPatient = new this.patientModel(patient);
    return newPatient.save();
  }
  async delete(id: string): Promise<Patient> {
    return await this.patientModel.findByIdAndRemove({ _id: id });
  }
}
