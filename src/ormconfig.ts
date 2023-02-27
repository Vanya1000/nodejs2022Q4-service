import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Album } from './album/entities/album.entity';
import { Artist } from './artist/entities/artist.entity';
import { Track } from './track/entities/track.entity';
import { Favorites } from './favs/entities/fav.entity';

dotenv.config();

export const ormconfig = {
  type: process.env.TYPE_CONNECTION,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Artist, Album, Track, Favorites],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsRun: true,
  synchronize: false,
} as DataSourceOptions;

export default new DataSource(ormconfig);
