import { Role } from "src/auth/enums/enum";
export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  isActive: boolean;
}
