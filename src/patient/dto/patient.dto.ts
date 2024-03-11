import { IsEnum, IsOptional, IsString } from "class-validator";
import { Status } from "../../auth/enums/enum";
export class patientDto {
  @IsString()
  readonly patientId: string;

  @IsString()
  readonly image: string;

  @IsString()
  readonly desc: string;

  @IsString()
  readonly userName: string;

  @IsString()
  @IsOptional()
  readonly comment: string;

  @IsEnum(Status, {
    message: "Invalid status value. Please select a valid status.",
  })
  readonly status: Status = Status.Pending;
}

export class updatePatientDto {
  @IsEnum(Status, {
    message: "Invalid status value. Please select a valid status.",
  })
  @IsOptional()
  readonly status: Status;

  @IsString()
  @IsOptional()
  readonly comment: string;

  @IsString()
  @IsOptional()
  readonly specialistId: string;

  @IsString()
  @IsOptional()
  readonly specialistName: string;
}
