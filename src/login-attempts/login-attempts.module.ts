import { Module } from "@nestjs/common";
import { LoginAttemptsService } from "./login-attempts.service";
import { LoginAttemptsController } from "./login-attempts.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { loginAttemptSchema } from "./schemas/login-attempt.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "LoginAttempt", schema: loginAttemptSchema },
    ]),
  ],
  controllers: [LoginAttemptsController],
  providers: [LoginAttemptsService],
  exports: [LoginAttemptsService],
})
export class LoginAttemptsModule {}
