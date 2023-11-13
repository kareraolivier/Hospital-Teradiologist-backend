import { Status } from "src/auth/enums/enum";
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
