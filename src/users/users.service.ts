import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-users.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaClient) {}

  async getUsers() {
    return await this.prisma.usuarios.findMany();
  }

  async getUsersByCpf(CPF: string) {
    const user = await this.prisma.usuarios.findMany({ where: { CPF: CPF } });
    if (!user) {
      return new NotFoundException(
        `Usuario do Cpf: ${CPF} não foi encontrado ou não existe.`,
      );
    }

    return user;
  }

  async getUsersById(id: number) {
    const user = await this.prisma.usuarios.findMany({ where: { id: Number(id) } });
    if (!user) {
      return new NotFoundException(
        `Usuario do id: ${id} não foi encontrado ou não existe.`,
      );
    }

    return user;
  }

  async createUser(data: UserDto) {
    try {
      const user = await this.prisma.usuarios.findFirst({
        where: {
          CPF: data.CPF,
        },
      });
      if (user) {
        return new BadRequestException(`Usúario já existe`);
      }

       const salt = await bcrypt.genSalt();

       data.senha = await bcrypt.hash(data.senha, salt);

      const newUser = await this.prisma.usuarios.create({
        data,
      });

      return newUser;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'não foi possivel registrar usúario na base de dados.',
      );
    }
  }

  async updateUser(
    id: number,
    { nome, CPF, active, numero_telefone, senha }: UpdateUserDto,
  ) {
    try {
      const user = await this.prisma.usuarios.findFirst({
        where: { id: Number(id) },
      });
      if (!user) {
        return new NotFoundException(
          `Usúario com id: ${id} não foi encontrado.`,
        );
      }
    
       const salt = await bcrypt.genSalt();
       const hashPass = await bcrypt.hash(senha, salt)

      const updateUser = await this.prisma.usuarios.update({
        where: {
          id: Number(id),
        },
        data: {
          active,
          CPF,
          nome,
          numero_telefone,
          senha: hashPass,
        },
      });
      return { sucess: 'Usuario atualizado com sucesso.' };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'não foi possivel atualizar o usúario na base de dados.',
      );
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.prisma.usuarios.findFirst({
        where: { id: Number(id) },
      });
      if (!user) {
        return new NotFoundException(
          `Usúario com id: ${id} não foi encontrado.`,
        );
      }
      await this.prisma.usuarios.delete({ where: { id: Number(id) } });
      return { sucess: 'Usuario deletado com sucesso.' };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'não foi possivel deletar o usúario na base de dados.',
      );
    }
  }
}
