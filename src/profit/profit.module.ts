import { Module } from '@nestjs/common';
import { ProfitService } from './profit.service';
import { ProfitController } from './profit.controller';
import { PrismaClient } from '@prisma/client';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [ProfitController],
  providers: [ProfitService, PrismaClient],
})
export class ProfitModule {}
