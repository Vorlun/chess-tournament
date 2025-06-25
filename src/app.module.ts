import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admins/admins.module';

@Module({
  imports: [AdminModule, AuthModule],
})
export class AppModule {}
