import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RegisterPlansDto } from './dtos/register-plans.dto';
import { UpdatePlanDto } from './dtos/update-plan.dto';

@Injectable()
export class PlansService {
  constructor(private readonly prisma: PrismaClient) {}

  async registerPlan(data: RegisterPlansDto) {
    try {
      const createPlan = await this.prisma.planos.create({ data });
      return createPlan;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'erro interno do servidor, por favor tente novamente mais tarde',
        error,
      );
    }
  }

  async getPlans() {
    try {
      const plan = await this.prisma.planos.findMany();
      return plan;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'Erro interno no servidor, por favor tente novamente mais tarde',
        error,
      );
    }
  }

  async getPlanById(id: number) {
    try {
      const plan = await this.prisma.planos.findUnique({ where: { id } });
      if (!plan) {
        return new NotFoundException(
          'não foi possivel visualizar o plano requerido.',
        );
      }
      return plan;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'Erro interno no servidor, por favor tente novamente mais tarde',
        error,
      );
    }
  }

  async updatePlan(
    { descricao, duracao, nome_plano, valor }: UpdatePlanDto,
    id: number,
  ) {
    try {
      const plan = await this.prisma.planos.findUnique({
        where: { id },
      });
      if (!plan) {
        return new NotFoundException(
          'não foi possivel visualizar o plano requerido.',
        );
      }

      await this.prisma.planos.update({
        where: {
          id: Number(id),
        },
        data: {
          descricao,
          duracao,
          nome_plano,
          valor,
        },
      });

      return { sucess: 'Plano atualizado com sucesso' };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'Erro interno do servidor, por favor tente novamente mais tarde',
        error,
      );
    }
  }

  async deletePlan(id: number) {
    try {
      const plan = await this.prisma.planos.findUnique({
        where: { id },
      });
      if (!plan) {
        return new NotFoundException(
          'não foi possivel visualizar o plano requerido.',
        );
      }

      await this.prisma.planos.delete({
        where: {
          id: Number(id),
        },
      });

      return { sucess: 'Plano deletado da base de dados com sucesso' };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'Erro interno do servidor, por favor tente novamente mais tarde',
        error,
      );
    }
  }
}
