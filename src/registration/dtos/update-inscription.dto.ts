import { PartialType } from "@nestjs/mapped-types";
import { registerRegistrationDto } from "./register-registration.dto";

export class updateInscriptionDto extends PartialType(registerRegistrationDto) {}