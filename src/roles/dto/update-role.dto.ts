import { PartialType } from '@nestjs/mapped-types';
import { RoleDto } from './create-role.dto';


export class UpdateRoleDto extends PartialType(RoleDto) {}
