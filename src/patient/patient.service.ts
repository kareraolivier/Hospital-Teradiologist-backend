import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Patient } from "./interface/patient.interface";
import { Model } from "mongoose";
import { patientCount } from "src/radiology/interface/radiology.interface";
import { Status } from "src/auth/enums/enum";

@Injectable()
export class PatientService {
  constructor(
    @InjectModel("Patient") private readonly patientModel: Model<Patient>,
  ) {}

  async getAllPatient(patientId: string): Promise<Patient[]> {
    return await this.patientModel.find({ patientId });
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

  async countAll(): Promise<patientCount> {
    const patient = await this.patientModel.find();
    console.log(patient);
    const all = patient.length;
    const pending = patient.filter((el) => el.status === Status.Pending).length;
    const progress = patient.filter(
      (el) => el.status === Status.Inprogress,
    ).length;
    const completed = patient.filter(
      (el) => el.status === Status.Completed,
    ).length;
    return { all, pending, progress, completed };
  }
}
