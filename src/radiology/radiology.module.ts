import { Module } from "@nestjs/common";
import { RadiologyService } from "./radiology.service";
import { RadiologyController } from "./radiology.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { RadiologySchema } from "./shemas/radiology.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Radiology", schema: RadiologySchema }]),
  ],
  providers: [RadiologyService],
  controllers: [RadiologyController],
  exports: [RadiologyService],
})
export class RadiologyModule {}
