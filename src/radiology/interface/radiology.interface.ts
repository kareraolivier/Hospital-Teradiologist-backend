import { Status } from "../../auth/enums/enum";
export interface Radiology {
  id?: string;
  status: Status;
  patientId: string;
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  userId?: string;
  image: string;
  desc: string;
  comment: string;
}

export interface SpecialistRadiology {
  id?: string;
  status: Status;
  comment: string;
}

export interface patientCount {
  all: number;
  pending: number;
  progress: number;
  completed: number;
}
