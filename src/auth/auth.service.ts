import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, Usuarios } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { LoginAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly JWTService: JwtService,

    private readonly prisma: PrismaClient,
  ) {}
  createToken(user: Usuarios) {
    return {
      accessToken: this.JWTService.sign(
        {
          id: user.id,
          name: user.nome,
          CPF: user.CPF,
        },
        {
          secret: String(process.env.JWT_SECRET),
          expiresIn: '1 day',
          subject: String(user.id),
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.JWTService.verify(token, {
        secret: String(process.env.JWT_SECRET),
      });

      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async login(credentials: LoginAuthDto) {
    try {
      const user = await this.prisma.usuarios.findFirst({
        where: {
          CPF: credentials.CPF,
        },
      });

      if (!user) return new UnauthorizedException('CPF ou senha incorretos');
    

      if (!(await bcrypt.compare(credentials.senha, user.senha))) {
        return new UnauthorizedException('CPF ou senha incorretos');
      }

      return this.createToken(user);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'Erro interno do servidor, por favor tente novamente.',
      );
    }
  }
}
