import { IsEmail, IsInt, IsLowercase, IsString } from "class-validator";
export class radiologyDto {
  @IsString()
  readonly patientId: string;
  @IsString()
  readonly firstName: string;
  @IsString()
  readonly lastName: string;
  @IsInt()
  readonly age: number;
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
  readonly comment: string;
}
