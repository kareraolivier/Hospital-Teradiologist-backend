import { Injectable } from "@nestjs/common";
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
}
