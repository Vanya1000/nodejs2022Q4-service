import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from './dataBase/database.module';
import { UsersModule } from './users/users.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavsModule } from './favs/favs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Artist } from './artist/entities/artist.entity';
import { Album } from './album/entities/album.entity';
import { Track } from './track/entities/track.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Artist, Album, Track],
      logging: true,
      synchronize: true,
    }),
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
