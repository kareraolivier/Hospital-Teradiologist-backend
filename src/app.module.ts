import { Module, ValidationPipe } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { mongoUrl } from "./config/config";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { RadiologyModule } from "./radiology/radiology.module";
import { APP_PIPE } from "@nestjs/core";
import { PatientModule } from './patient/patient.module';
@Module({
  imports: [
    UsersModule,
    AuthModule,
    RadiologyModule,
    MongooseModule.forRoot(mongoUrl),
    PatientModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
