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

  async calcularLucroPorAlunoMesAno(
    usuarioId: number,
    mes: number,
    ano: number,
  ) {
    try {
      const inicioMes = new Date(ano, mes - 1, 1);
      const fimMes = new Date(ano, mes, 0, 23, 59, 59, 999);

      const inscricoes = await this.prisma.inscricoes.findMany({
        where: {
          usuarioId: usuarioId,
          data_inicio: {
            gte: inicioMes,
            lte: fimMes,
          },
        },
        include: {
          Plano: true,
        },
      });

      const lucroTotal = inscricoes.reduce(
        (acc, inscricao) => acc + inscricao.Plano.valor,
        0,
      );

      return lucroTotal;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro interno do servidor', error);
    }
  }
}
