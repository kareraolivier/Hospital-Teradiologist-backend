export interface LoginAttempt {
  user: string;
  ipAddress: string;
  successful: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
