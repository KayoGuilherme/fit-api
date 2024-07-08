import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { PrismaClient } from '@prisma/client';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [PlansController],
  providers: [PlansService, PrismaClient],
  exports:[PlansService]
})
export class PlansModule {}
