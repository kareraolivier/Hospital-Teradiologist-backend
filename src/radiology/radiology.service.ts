import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UsersService } from "src/users/users.service";
import { Model } from "mongoose";
import {
  Radiology,
  SpecialistRadiology,
} from "./interface/radiology.interface";

@Injectable()
export class RadiologyService {
  constructor(
    @InjectModel("Radiology") private readonly radiologyModel: Model<Radiology>,
    private usersService: UsersService,
  ) {}

  async findAll(): Promise<Radiology[]> {
    return await this.radiologyModel.find();
  }
  async create(radiology: Radiology): Promise<Radiology> {
    const { email, userId } = radiology;
    await this.usersService.getUserById(userId);

    const patiantEmail = await this.radiologyModel.findOne({ email });
    if (patiantEmail) {
      throw new NotAcceptableException("Patiant exist");
    }

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
  async specialistUpdate(
    id: string,
    specialistRadiology: SpecialistRadiology,
  ): Promise<Radiology> {
    return await this.radiologyModel.findByIdAndUpdate(
      id,
      specialistRadiology,
      {
        new: true,
      },
    );
  }
}
