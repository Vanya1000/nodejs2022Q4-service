import { Injectable } from '@nestjs/common';
import DBAlbums from './entities/DBAlbum';
import DBArtists from './entities/DBArtists';
import DBFavs from './entities/DBFavs';
import DBTracks from './entities/DBTrack';
import DBUsers from './entities/DBUsers';

@Injectable()
export default class DB {
  users = new DBUsers();
  artists = new DBArtists();
  album = new DBAlbums();
  track = new DBTracks();
  favs = new DBFavs();
}
