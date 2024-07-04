import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [PlansController],
  providers: [PlansService, PrismaClient],
  exports:[PlansService]
})
export class PlansModule {}
