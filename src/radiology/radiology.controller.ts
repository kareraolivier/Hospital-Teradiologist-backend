import { Controller, Get, Post, Body } from "@nestjs/common";
import { Radiology } from "./interface/radiology.interface";
import { RadiologyService } from "./radiology.service";
import { radiologyDto } from "./dto/radiology.dto";

@Controller("radiology")
export class RadiologyController {
  constructor(private readonly radiologyService: RadiologyService) {}
  @Get()
  findAll(): Promise<Radiology[]> {
    return this.radiologyService.findAll();
  }
  @Post()
  create(@Body() radiologyDto: radiologyDto): Promise<Radiology> {
    return this.radiologyService.create(radiologyDto);
  }
}
