import { Injectable } from '@nestjs/common';
import { CreateLoginAttemptDto } from './dto/create-login-attempt.dto';
import { UpdateLoginAttemptDto } from './dto/update-login-attempt.dto';

@Injectable()
export class LoginAttemptsService {
  create(createLoginAttemptDto: CreateLoginAttemptDto) {
    return 'This action adds a new loginAttempt';
  }

  findAll() {
    return `This action returns all loginAttempts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loginAttempt`;
  }

  update(id: number, updateLoginAttemptDto: UpdateLoginAttemptDto) {
    return `This action updates a #${id} loginAttempt`;
  }

  remove(id: number) {
    return `This action removes a #${id} loginAttempt`;
  }
}
