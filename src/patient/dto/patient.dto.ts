import { IsEnum, IsOptional, IsString } from "class-validator";
import { Status } from "../../auth/enums/enum";
export class patientDto {
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
  readonly status: Status;
}
