import { ConflictException } from "@nestjs/common";

export class PatientAlreadyExistsException extends ConflictException {
  constructor() {
    super("Patient already exists");
  }
}
