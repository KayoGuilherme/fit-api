import { PartialType } from "@nestjs/mapped-types";
import { RegisterPlansDto } from "./register-plans.dto";

export class UpdatePlanDto extends PartialType(RegisterPlansDto) {}