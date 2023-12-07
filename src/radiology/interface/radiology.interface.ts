import { Status } from "src/types/enum";
export interface Radiology {
  id?: string;
  status: Status;
  patientId: string;
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  userId: string;
  image: string;
  desc: string;
  comment: string;
}

export interface SpecialistRadiology {
  id?: string;
  status: Status;
  comment: string;
}
