import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Radiology } from "./interface/radiology.interface";

@Injectable()
export class RadiologyService {
  constructor(
    @InjectModel("Radiology") private readonly radiologyModel: Model<Radiology>,
  ) {}

  async findAll(): Promise<Radiology[]> {
    return await this.radiologyModel.find();
  }
  async create(radiology: Radiology): Promise<Radiology> {
    const radiologys = await this.radiologyModel.create(radiology);
    return radiologys.save();
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
}
