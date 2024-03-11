import { Module, forwardRef } from "@nestjs/common";
import { RadiologyService } from "./radiology.service";
import { RadiologyController } from "./radiology.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { RadiologySchema } from "./shemas/radiology.schema";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Radiology", schema: RadiologySchema }]),
    forwardRef(() => UsersModule),
  ],
  providers: [RadiologyService],
  controllers: [RadiologyController],
  exports: [RadiologyService],
})
export class RadiologyModule {}
