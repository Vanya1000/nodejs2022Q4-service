import { Module } from '@nestjs/common';
import { DataBaseModule } from './dataBase/database.module';
import { UsersModule } from './users/users.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavsModule } from './favs/favs.module';

@Module({
  imports: [
    DataBaseModule,
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
