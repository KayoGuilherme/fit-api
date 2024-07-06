import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { PlansService } from './plans.service';
import { Paramid } from 'src/decorators/param-id.decorator';
import { RegisterPlansDto } from './dtos/register-plans.dto';
import { UpdatePlanDto } from './dtos/update-plan.dto';
import { AuthGuard } from 'src/guards/auth.guard';


@UseGuards(AuthGuard)
@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get()
  async getPlan() {
    return this.plansService.getPlans();
  }

  @Get(':id')
  async getPlanById(@Paramid() id: number) {
    return this.plansService.getPlanById(id);
  }

  @Post()
  async createPlan(@Body() data: RegisterPlansDto) {
    return this.plansService.registerPlan(data);
  }

  @Put(':id')
  async updatePlan(
    @Paramid() id: number,
    @Body() { descricao, duracao, nome_plano, valor }: UpdatePlanDto,
  ) {
    return this.plansService.updatePlan(
      { descricao, duracao, nome_plano, valor },
      id,
    );
  }

  @Delete(':id')
  async deletePlan(@Paramid() id: number) {
    return this.plansService.deletePlan(id);
  }
}
