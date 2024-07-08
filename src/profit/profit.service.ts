import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProfitService {
  constructor(private readonly prisma: PrismaClient) {}

  async calcularLucroTotal() {
    try {
      const inscricoes = await this.prisma.inscricoes.findMany({
        include: {
          Plano: {
            select: {
              valor: true,
            },
          },
        },
      });

      const lucroTotal = inscricoes.reduce(
        (acc, inscricao) => acc + inscricao.Plano.valor,
        0,
      );

      return { lucroTotal };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro interno do servidor', error);
    }
  }

  async getUserProfits(
    usuarioId: number,
    month: string,
    year: string,
  ){
    // Formato esperado para month e year: '07' e '2024'
    const startOfMonth = new Date(parseInt(year), parseInt(month) - 1, 1);
    const endOfMonth = new Date(parseInt(year), parseInt(month), 0);

    // Calculando o lucro mensal
    const monthlySubscriptions = await this.prisma.inscricoes.findMany({
      where: {
        usuarioId: Number(usuarioId),
        data_inicio: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      include: {
        Plano: true,
      },
    });

    const monthlyProfit = monthlySubscriptions.reduce((acc, inscricao) => {
      return acc + inscricao.Plano.valor;
    }, 0);

    // Calculando o lucro total
    const totalSubscriptions = await this.prisma.inscricoes.findMany({
      where: {
        usuarioId: Number(usuarioId),
      },
      include: {
        Plano: true,
      },
    });

    const totalProfit = totalSubscriptions.reduce((acc, inscricao) => {
      return acc + inscricao.Plano.valor;
    }, 0);

    return { monthlyProfit, totalProfit };
  }
}


