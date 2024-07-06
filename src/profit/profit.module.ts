import { Module } from '@nestjs/common';
import { ProfitService } from './profit.service';
import { ProfitController } from './profit.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [ProfitController],
  providers: [ProfitService, PrismaClient],
})
export class ProfitModule {}
