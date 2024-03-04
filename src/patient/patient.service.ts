import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Patient } from "./interface/patient.interface";
import { Model } from "mongoose";
import { ObjectId } from "mongoose";
import { Query as ExpressQuery } from "express-serve-static-core";
import {
  Radiology,
  SpecialistRadiology,
  patientCount,
} from "src/radiology/interface/radiology.interface";
import { Status } from "src/auth/enums/enum";
import { RadiologyService } from "src/radiology/radiology.service";
import { userDto } from "src/users/dto/user.dto";
import { patientDto } from "./dto/patient.dto";
import { radiologyDto } from "src/radiology/dto/radiology.dto";

@Injectable()
export class PatientService {
  constructor(
    @InjectModel("Patient") private readonly patientModel: Model<Patient>,
    private readonly radiologyService: RadiologyService,
  ) {}

  async getAllPatient(
    patientId: string,
    query: ExpressQuery,
  ): Promise<{ data: Patient[]; totalPages: number }> {
    //Imprementation of pagination
    const patPerPage = 10;
    const currentPage = Number(query.page) || 1;
    const nextPage = patPerPage * (currentPage - 1);

    //Imprementation of search
    const searchCondition: any = { patientId };

    if (query.keyword) {
      query.page = "1";
      const searchRegex = {
        $regex: query.keyword,
        $options: "i",
      };

      searchCondition.$or = [{ comment: searchRegex }, { desc: searchRegex }];
    }

    const totalCount = await this.patientModel.countDocuments(searchCondition);
    const totalPages = Math.ceil(totalCount / patPerPage);
    const data = await this.patientModel
      .find(searchCondition)
      .sort({ createdAt: -1 })
      .limit(patPerPage)
      .skip(nextPage);

    return { data, totalPages };
  }
  async findOne(
    id: string,
  ): Promise<{ radiology: Radiology; patient: Patient }> {
    const patient = await this.patientModel.findOne({ _id: id });
    if (!patient) throw new NotFoundException("Patiant not found");
    const patientId = patient.patientId.toString();
    const radiology = await this.radiologyService.findOne(patientId);
    return { radiology, patient };
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
  async specialistUpdate(
    id: string,
    specialistRadiology: SpecialistRadiology,
  ): Promise<Radiology> {
    try {
      return await this.patientModel.findByIdAndUpdate(
        id,
        specialistRadiology,
        {
          new: true,
        },
      );
    } catch (error) {
      throw new NotFoundException("Patiant not updated");
    }
  }
}
