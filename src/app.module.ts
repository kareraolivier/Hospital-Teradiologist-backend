import { Module, ValidationPipe } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { mongoUrl } from "./config/Index";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { RadiologyModule } from "./radiology/radiology.module";
import { APP_PIPE } from "@nestjs/core";
@Module({
  imports: [
    UsersModule,
    AuthModule,
    RadiologyModule,
    MongooseModule.forRoot(mongoUrl),
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
