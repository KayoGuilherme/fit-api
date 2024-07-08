import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class registerRegistrationDto {
  @IsNumber()
  @IsNotEmpty()
  usuarioId: number;
  
  @IsNumber()
  @IsNotEmpty()
  planoId: number;

  @IsString()
  data_inicio: string;

  @IsDateString()
  @IsNotEmpty()
  data_fim: string;
}
