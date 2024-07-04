import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class registerRegistrationDto {
  @IsNumber()
  @IsNotEmpty()
  usuarioId: number;
  
  @IsNumber()
  @IsNotEmpty()
  planoId: number;

  @IsDate()
  data_inicio: Date;

  @IsDateString()
  @IsNotEmpty()
  data_fim: string;
}
