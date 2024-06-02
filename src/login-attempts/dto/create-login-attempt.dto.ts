export class CreateLoginAttemptDto {
  readonly user: string;
  readonly ipAddress: string;
  readonly successful: boolean;
}
