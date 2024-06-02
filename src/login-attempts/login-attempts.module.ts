import { Module } from '@nestjs/common';
import { LoginAttemptsService } from './login-attempts.service';
import { LoginAttemptsController } from './login-attempts.controller';

@Module({
  controllers: [LoginAttemptsController],
  providers: [LoginAttemptsService],
})
export class LoginAttemptsModule {}
