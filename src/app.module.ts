import { Module } from '@nestjs/common';
import { DataBaseModule } from './dataBase/database.module';
import { UsersModule } from './users/users.module';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [DataBaseModule, UsersModule, ArtistModule],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
