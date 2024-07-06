import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { registerRegistrationDto } from './dtos/register-registration.dto';
import { UsersService } from 'src/users/users.service';
import { PlansService } from 'src/plans/plans.service';
import { updateInscriptionDto } from './dtos/update-inscription.dto';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly usersService: UsersService,
    private readonly plan: PlansService,
  ) {}

  async createInscription(data: registerRegistrationDto) {
    try {
      const user = await this.usersService.getUsersById(data.usuarioId);
      if (!user) return new NotFoundException('Usuario não encontrado.');

      const plan = await this.plan.getPlanById(data.planoId);
      if (!plan) return new NotFoundException('Plano não encontrado.');

      const registration = await this.prisma.inscricoes.create({
        data,
      });

      return registration;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro interno do servidor', error);
    }
  }

  async getInscription() {
    try {
      const getInscription = await this.prisma.inscricoes.findMany({
        include: {
          Usuario: {
            select: {
              nome: true,
              CPF: true,
              active: true,
              data_inscricao: true,
            },
          },
          Plano: {
            select: {
              nome_plano: true,
              duracao: true,
              valor: true,
            },
          },
        },
      });
      return getInscription;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro interno do servidor', error);
    }
  }

  async getInscriptionById(id: number) {
    try {
      const getInscription = await this.prisma.inscricoes.findFirst({
        where: {
          id: Number(id),
        },
        include: {
          Usuario: {
            select: {
              nome: true,
              CPF: true,
              active: true,
              data_inscricao: true,
            },
          },
          Plano: {
            select: {
              nome_plano: true,
              duracao: true,
              valor: true,
            },
          },
        },
      });

      if (!getInscription) {
        return new NotFoundException(
          'Inscrição não foi encontrada na base de dados',
        );
      }
      return getInscription;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro interno do servidor', error);
    }
  }
  async updateInscription(
    { usuarioId, planoId, data_inicio, data_fim }: updateInscriptionDto,
    id: number,
  ) {
    try {
      const getInscription = await this.prisma.inscricoes.findFirst({
        where: {
          id: Number(id),
        },
      });

      if (!getInscription)
        return new NotFoundException(
          'Inscrição não foi encontrada na base de dados',
        );

      await this.prisma.inscricoes.update({
        where: {
          id: Number(id),
        },
        data: {
          usuarioId,
          planoId,
          data_inicio,
          data_fim,
        },
      });
      return { sucess: 'Inscrição atualizada com sucesso' };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro interno do servidor', error);
    }
  }

  async deleteInscription(id: number) {
    try {
      const getInscription = await this.prisma.inscricoes.findFirst({
        where: {
          id: Number(id),
        },
      });

      if (!getInscription)
        return new NotFoundException(
          'Inscrição não foi encontrada na base de dados',
        );

      await this.prisma.inscricoes.delete({
        where: { id: Number(id) },
      });
      return { sucess: 'Inscrição deletada com sucesso.' };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro interno do servidor', error);
    }
  }

  
}
