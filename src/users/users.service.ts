import {
  Injectable,
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
    return await this.userModel.find({}, { password: 0 }).exec();
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
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) throw new NotFoundException("user not found");
    return user;
  }
  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove({ _id: id });
  }
  async update(id: string, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }
}
