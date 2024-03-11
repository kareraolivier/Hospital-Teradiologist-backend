import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from "@nestjs/common";
import { Model } from "mongoose";
import { User, IAllUser } from "./interface/user.interface";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import { PatientService } from "src/patient/patient.service";
@Injectable()
export class UsersService {
  constructor(
    @InjectModel("User") private readonly userModel: Model<User>,
    private readonly patientService: PatientService,
  ) {}

  async findAll(): Promise<IAllUser[]> {
    const users = await this.userModel
      .find({}, { password: 0 })
      .sort({ createdAt: -1 });

    const usersWithPatientCount: IAllUser[] = [];
    for (const user of users) {
      const allPatients = await this.patientService.findAllById(user.id);
      const userWithPatientCount = {
        ...user.toObject(),
        patientCount: allPatients.length,
      };
      usersWithPatientCount.push(userWithPatientCount);
    }

    return usersWithPatientCount;
  }
  async registerUser(user: User): Promise<User> {
    const { email } = user;
    const userEmail = await this.userModel.findOne({ email });
    if (userEmail) {
      throw new NotAcceptableException("User exist");
    }
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = new this.userModel(user);
    await newUser.save();
    return newUser;
  }
  async getUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async getUserById(id: string): Promise<User> {
    try {
      return await this.userModel.findOne({ _id: id }, { password: 0 }).exec();
    } catch (error) {
      throw new InternalServerErrorException(
        "An error occurred the user does not exist",
      );
    }
  }

  async stopUser(id: string): Promise<User> {
    const existingUser = await this.userModel.findById(id);
    if (!existingUser) throw new NotFoundException("user not found");
    existingUser.isActive = !existingUser.isActive;
    const updatedUser = await existingUser.save();
    return updatedUser;
  }

  async delete(id: string): Promise<User> {
    const userId = await this.userModel.findByIdAndRemove({ _id: id });
    if (!userId) throw new NotFoundException("user not found");
    return userId;
  }

  async update(id: string, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }
}
