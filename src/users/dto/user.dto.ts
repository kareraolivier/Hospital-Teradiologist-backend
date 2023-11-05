import { Role } from "src/auth/enums/role.enum";
export class userDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly role: Role;
}
