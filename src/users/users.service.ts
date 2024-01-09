import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from "@nestjs/common";
import { Model } from "mongoose";
import { User } from "./interface/user.interface";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel
      .find({}, { password: 0 })
      .sort({ createdAt: -1 });
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
