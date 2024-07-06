import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProfitService } from './profit.service';
import { AuthGuard } from 'src/guards/auth.guard';



@UseGuards(AuthGuard)
@Controller('profit')
export class ProfitController {
  constructor(private readonly profitService: ProfitService) {}

  @Get('lucro-total')
  async getLucroTotal() {
    return this.profitService.calcularLucroTotal();
  }

  @Get('lucro-aluno/:usuarioId/:mes/:ano')
  async getLucroPorAlunoMesAno(
    @Param('usuarioId') usuarioId: number,
    @Param('mes') mes: number,
    @Param('ano') ano: number,
  ) {
    return this.profitService.calcularLucroPorAlunoMesAno(usuarioId, mes, ano);
  }
}
