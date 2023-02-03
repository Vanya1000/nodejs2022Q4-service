import { Injectable } from '@nestjs/common';
import DBAlbums from './entities/DBAlbum';
import DBArtists from './entities/DBArtists';
import DBUsers from './entities/DBUsers';

@Injectable()
export default class DB {
  users = new DBUsers();
  artists = new DBArtists();
  album = new DBAlbums();
}
