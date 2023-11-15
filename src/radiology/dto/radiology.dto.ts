import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsLowercase,
  IsString,
} from "class-validator";
import { Status } from "src/auth/enums/enum";
export class radiologyDto {
  @IsString()
  readonly patientId: string;
  @IsString()
  readonly firstName: string;
  @IsString()
  readonly lastName: string;
  readonly age: string;
  @IsString()
  @IsEmail()
  @IsLowercase()
  readonly email: string;
  @IsString()
  readonly userId: string;
  @IsString()
  readonly image: string;
  @IsString()
  readonly desc: string;
  @IsString()
  @IsOptional()
  readonly comment: string;
  @IsEnum(Status, {
    message: "Invalid status value. Please select a valid status.",
  })
  @IsOptional()
  readonly status: Status;
}

export class specialistRadiologyDto {
  @IsEnum(Status, {
    message: "Invalid status value. Please select a valid status.",
  })
  @IsOptional()
  readonly status: Status;

  @IsString()
  @IsOptional()
  readonly comment: string;
}
