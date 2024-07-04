import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  @IsNotEmpty()
  CPF: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
  })
  senha: string;
}
