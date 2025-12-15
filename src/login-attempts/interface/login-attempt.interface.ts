export interface LoginAttempt {
  user: string;
  ipAddress: string | string[];
  successful: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
