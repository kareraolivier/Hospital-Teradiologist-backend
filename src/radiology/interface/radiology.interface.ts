import { Status } from "../../auth/enums/enum";
export interface Radiology {
  id?: string;
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  userId?: string;
}

export interface SpecialistRadiology {
  id?: string;
  status: Status;
  comment: string;
  specialistId?: string;
  specialistName?: string;
}

export interface patientCount {
  all: number;
  pending: number;
  progress: number;
  completed: number;
}
