import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { mongoUrl } from "./config/Index";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { RadiologyModule } from "./radiology/radiology.module";
@Module({
  imports: [
    UsersModule,
    AuthModule,
    RadiologyModule,
    MongooseModule.forRoot(mongoUrl),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
