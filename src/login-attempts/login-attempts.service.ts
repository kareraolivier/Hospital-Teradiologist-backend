import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LoginAttempt } from "./interface/login-attempt.interface";
import { CreateLoginAttemptDto } from "./dto/create-login-attempt.dto";

@Injectable()
export class LoginAttemptsService {
  constructor(
    @InjectModel("LoginAttempt")
    private readonly loginAttemptModel: Model<LoginAttempt>,
  ) {}
  async create(
    createLoginAttemptDto: CreateLoginAttemptDto,
  ): Promise<LoginAttempt> {
    const createdLoginAttempt = new this.loginAttemptModel(
      createLoginAttemptDto,
    );
    return await createdLoginAttempt.save();
  }

  async findAll(): Promise<LoginAttempt[]> {
    return await this.loginAttemptModel.find().exec();
  }

  async findOne(id: string): Promise<LoginAttempt> {
    return await this.loginAttemptModel.findById(id).exec();
  }

  async remove(id: string): Promise<LoginAttempt> {
    return await this.loginAttemptModel.findByIdAndRemove(id).exec();
  }
}
