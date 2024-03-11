import { IsEmail, IsLowercase, IsString } from "class-validator";
import { Status } from "../../auth/enums/enum";
export class radiologyDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  readonly age: string;

  @IsString()
  @IsEmail()
  @IsLowercase()
  readonly email: string;
}

export class patientCountDto {
  all: number;
  pending: number;
  progress: number;
  completed: number;
}
