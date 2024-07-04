import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_JWT,
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, PrismaClient],
})
export class AuthModule {}
