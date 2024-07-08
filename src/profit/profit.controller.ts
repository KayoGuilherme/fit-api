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

  @Get(':usuarioId/:month/:year')
  async getUserProfits(
    @Param('usuarioId') usuarioId: number,
    @Param('month') month: string,
    @Param('year') year: string,
  ) {
    return this.profitService.getUserProfits(usuarioId, month, year);
  }
}
