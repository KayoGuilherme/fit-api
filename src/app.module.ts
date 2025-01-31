import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PlansModule } from './plans/plans.module';
import { RegistrationModule } from './registration/registration.module';
import { ProfitModule } from './profit/profit.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [UsersModule, AuthModule, PlansModule, RegistrationModule, ProfitModule, RolesModule]
})
export class AppModule {}
