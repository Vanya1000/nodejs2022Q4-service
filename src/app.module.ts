import { Module } from '@nestjs/common';
import { DataBaseModule } from './dataBase/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DataBaseModule, UsersModule],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
