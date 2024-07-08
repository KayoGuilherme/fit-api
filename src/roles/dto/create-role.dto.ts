import { IsNotEmpty, IsString } from 'class-validator';

export class RoleDto {
  @IsString()
  @IsNotEmpty()
  nome_role: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
