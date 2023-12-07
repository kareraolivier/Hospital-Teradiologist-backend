import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  Radiology,
  SpecialistRadiology,
} from "./interface/radiology.interface";
import { Query as ExpressQuery } from "express-serve-static-core";

@Injectable()
export class RadiologyService {
  constructor(
    @InjectModel("Radiology") private readonly radiologyModel: Model<Radiology>,
  ) {}

  async findAll(query: ExpressQuery): Promise<Radiology[]> {
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

    return await this.radiologyModel
      .find(searchCondition)
      .sort({ createdAt: -1 })
      .limit(radPerPage)
      .skip(nextPage);
  }

  async create(radiology: Radiology): Promise<Radiology> {
    try {
      const { email } = radiology;
      const patiantEmail = await this.radiologyModel.findOne({ email });
      if (patiantEmail) {
        throw new NotAcceptableException("Patiant exist");
      }

      const radiologys = await this.radiologyModel.create(radiology);
      return radiologys.save();
    } catch (error) {
      throw new NotAcceptableException("Failed to add new patient");
    }
  }

  async findOne(id: string): Promise<Radiology> {
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
  async specialistUpdate(
    id: string,
    specialistRadiology: SpecialistRadiology,
  ): Promise<Radiology> {
    try {
      return await this.radiologyModel.findByIdAndUpdate(
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
