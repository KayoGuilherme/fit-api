import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  CPF: string;

  @IsNotEmpty()
  @IsString()
  numero_telefone: string;

  @IsString()
  @IsNotEmpty()
  senha: string;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @IsNumber()
  roleId: number;

  @IsDate()
  data_inscricao: Date;
}
