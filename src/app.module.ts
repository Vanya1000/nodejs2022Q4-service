import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavsModule } from './favs/favs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from './ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(ormconfig),
    UsersModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavsModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
