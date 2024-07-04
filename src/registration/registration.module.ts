import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { PrismaClient } from '@prisma/client';
import { UsersModule } from 'src/users/users.module';
import { PlansModule } from 'src/plans/plans.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [UsersModule, PlansModule],
  controllers: [RegistrationController],
  providers: [RegistrationService, PrismaClient, UsersService],
})
export class RegistrationModule {}
