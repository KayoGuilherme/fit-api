import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleDto } from './dto/create-role.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: RoleDto) {
    const role = await this.prisma.roleAuthorization.create({ data });
    return role;
  }

  async findAll() {
    try {
      const role = await this.prisma.roleAuthorization.findMany();
      return role;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro interno no servidor', error);
    }
  }

  async findOne(id_role: number) {
    try {
      const role = await this.prisma.roleAuthorization.findFirst({
        where: {
          id_role: Number(id_role),
        },
      });
      if (!role) return new NotFoundException('Role nao foi encontrada');
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro interno no servidor', error);
    }
  }

  async update(id_role: number, { nome_role, description }: UpdateRoleDto) {
    try {
      const role = await this.prisma.roleAuthorization.findFirst({
        where: {
          id_role: Number(id_role),
        },
      });
      if (!role) return new NotFoundException('Role nao foi encontrada');

      await this.prisma.roleAuthorization.update({
        where: {
          id_role: Number(id_role),
        },
        data: {
          description,
          nome_role,
        },
      });
      return { sucess: true };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro interno no servidor', error);
    }
  }

  async remove(id_role: number) {
    try {
      const role = await this.prisma.roleAuthorization.findFirst({
        where: {
          id_role: Number(id_role),
        },
      });
      if (!role) return new NotFoundException('Role nao foi encontrada');

      await this.prisma.roleAuthorization.delete({
        where: {
          id_role: Number(id_role),
        },
      });
      return { sucess: true };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro interno no servidor', error);
    }
  }
}
