import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, STATES } from "mongoose";
import {
  Radiology,
  SpecialistRadiology,
  patientCount,
} from "./interface/radiology.interface";
import { Query as ExpressQuery } from "express-serve-static-core";
import { userDto } from "src/users/dto/user.dto";
import { Status } from "src/auth/enums/enum";
import { PatientAlreadyExistsException } from "src/patient/patient-exist.exception";

@Injectable()
export class RadiologyService {
  constructor(
    @InjectModel("Radiology") private readonly radiologyModel: Model<Radiology>,
  ) {}

  async findAll(
    query: ExpressQuery,
  ): Promise<{ data: Radiology[]; totalPages: number }> {
    //Imprementation of pagination
    const radPerPage = 10;
    const currentPage = Number(query.page) || 1;
    const nextPage = radPerPage * (currentPage - 1);

    //Imprementation of search
    const searchCondition: any = {};

    if (query.keyword) {
      query.page = "1";
      const searchRegex = {
        $regex: query.keyword,
        $options: "i",
      };

      searchCondition.$or = [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex },
      ];
    }

    const totalCount =
      await this.radiologyModel.countDocuments(searchCondition);
    const totalPages = Math.ceil(totalCount / radPerPage);

    const data = await this.radiologyModel
      .find(searchCondition)
      .sort({ createdAt: -1 })
      .limit(radPerPage)
      .skip(nextPage);

    return { data, totalPages };
  }

  async create(user: userDto, radiology: Radiology): Promise<Radiology> {
    const { email } = radiology;
    const patiantEmail = await this.radiologyModel.findOne({ email });
    if (patiantEmail) {
      throw new PatientAlreadyExistsException();
    }
    const createRadiology = { ...radiology, userId: user.id };
    const radiologys = await this.radiologyModel.create(createRadiology);
    return radiologys.save();
  }

  public async findOne(id: string): Promise<Radiology> {
    const radiology = await this.radiologyModel.findOne({ _id: id });
    if (!radiology) throw new NotFoundException("Patiant not found");
    return radiology;
  }
  async delete(id: string): Promise<Radiology> {
    return await this.radiologyModel.findByIdAndRemove({ _id: id });
  }
  async update(id: string, radiology: Radiology): Promise<Radiology> {
    return await this.radiologyModel.findByIdAndUpdate(id, radiology, {
      new: true,
    });
  }
}
