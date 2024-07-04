import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterPlansDto {
  @IsString()
  @IsNotEmpty()
  nome_plano: string;

  @IsString()
  descricao: string;

  @IsNumber()
  @IsNotEmpty()
  valor: number;

  @IsNumber()
  @IsNotEmpty()
  duracao: number;
}
