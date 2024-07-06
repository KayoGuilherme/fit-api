import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { Paramid } from 'src/decorators/param-id.decorator';
import { registerRegistrationDto } from './dtos/register-registration.dto';
import { updateInscriptionDto } from './dtos/update-inscription.dto';
import { AuthGuard } from 'src/guards/auth.guard';


@UseGuards(AuthGuard)
@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}
  @Get()
  async getInscription() {
    return this.registrationService.getInscription();
  }

  @Get(':id')
  async getInscriptionById(@Paramid() id: number) {
    return this.registrationService.getInscriptionById(id);
  }

  @Post()
  async createInscription(@Body() data: registerRegistrationDto) {
    return this.registrationService.createInscription(data);
  }

  @Put(':id')
  async updateInscription(
    @Paramid() id: number,
    @Body() { usuarioId, data_fim, data_inicio, planoId }: updateInscriptionDto,
  ) {
    return this.registrationService.updateInscription(
      { data_fim, data_inicio, planoId, usuarioId },
      id,
    );
  }

  @Delete(':id')
  async deleteInscription(id: number) {
    return this.registrationService.deleteInscription(id);
  }

  
}
