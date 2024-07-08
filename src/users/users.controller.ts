import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-users.dto';
import { ParamCPF } from 'src/decorators/param-cpf.decorator';
import { Paramid } from 'src/decorators/param-id.decorator';
import { AuthGuard } from 'src/guards/auth.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getUser() {
    return this.usersService.getUsers();
  }

  @UseGuards(AuthGuard)
  @Get(':CPF')
  async getUsersByCpf(@ParamCPF() CPF: string) {
    return this.usersService.getUsersByCpf(CPF);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUsersById(@Paramid() id: number) {
    return this.usersService.getUsersById(id);
  }

  @Post()
  async createUser(@Body() createUserDto: UserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateUser(
    @Paramid() id: number,
    @Body() { CPF, active, nome, numero_telefone, senha }: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, {
      CPF,
      active,
      nome,
      numero_telefone,
      senha,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Paramid() id: number) {
    return this.usersService.deleteUser(id);
  }
}
