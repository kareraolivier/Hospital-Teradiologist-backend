import { Status } from "src/auth/enums/enum";

export interface Patient {
  image: string;
  desc: string;
  comment: string;
  status: Status;
  userId?: string;
  userName: string;
  patientId?: string;
  specialistId?: string;
  specialistName?: string;
}
