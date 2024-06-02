export class CreateLoginAttemptDto {
  readonly user: string;
  readonly ipAddress: string | string[];
  readonly successful: boolean;
}
