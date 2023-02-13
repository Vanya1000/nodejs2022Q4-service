import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { Favorites } from './entities/fav.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistModule } from './../artist/artist.module';
import { AlbumModule } from './../album/album.module';
import { TrackModule } from './../track/track.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorites /* , Artist, Album, Track */]),
    ArtistModule,
    AlbumModule,
    TrackModule,
  ],
  controllers: [FavsController],
  providers: [FavsService],
  exports: [FavsService],
})
export class FavsModule {}
