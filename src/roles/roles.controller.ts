import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { RolesService } from './roles.service';

import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleDto } from './dto/create-role.dto';
import { Paramid } from 'src/decorators/param-id.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() data: RoleDto) {
    return this.rolesService.create(data);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id_role')
  findOne(@Paramid() id_role: number) {
    return this.rolesService.findOne(id_role);
  }

  @Put(':id_role')
  update(
    @Paramid() id_role: number,
    @Body() { nome_role, description }: UpdateRoleDto,
  ) {
    return this.rolesService.update(id_role, { nome_role, description });
  }

  @Delete(':id_role')
  remove(@Paramid() id_role: number) {
    return this.rolesService.remove(id_role);
  }
}
