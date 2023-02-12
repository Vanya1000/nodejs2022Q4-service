import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import DB from 'src/utils/DB/DB';
import { TrackService } from './../track/track.service';
import { FavsPathType } from './types/type';
import { ArtistService } from './../artist/artist.service';
import { AlbumService } from './../album/album.service';

@Injectable()
export class FavsService {
  constructor(private db: DB) {}

  /* private getEntity(type: FavsPathType) {
    switch (type) {
      case 'artists':
        return this.artistService;
      case 'albums':
        return this.albumService;
      case 'tracks':
        return this.trackService;
    }
  } */

  findAll() {
    /* const favs = this.db.favs.findMany();
    const favsWithEntities = {};
    Object.entries(favs).forEach(([key, value]) => {
      favsWithEntities[key] = this.getEntity(key as FavsPathType).tryGetMany(
        value,
      );
    });
    return favsWithEntities; */
  }

  create(type: FavsPathType, id: string) {
    /* const track = this.getEntity(type).tryGetOne(id);
    if (!track) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const entity = this.db.favs.findOneByType(type); // take out of db
    if (entity.includes(id)) {
      throw new HttpException('Already in favs', HttpStatus.CONFLICT);
    }
    this.db.favs.add(type, id);
    return {
      message: `Id: ${id} successfully added to ${type}`,
    }; */
  }

  remove(type: FavsPathType, id: string) {
    /* const entity = this.db.favs.findOneByType(type);
    if (!entity.includes(id)) {
      throw new HttpException('Not in favs', HttpStatus.NOT_FOUND);
    }
    this.db.favs.delete(type, id);
    return {
      message: `Id: ${id} successfully removed from ${type}`,
    }; */
  }

  /* removeFromAnother(type: FavsPathType, id: string) {
    const entity = this.db.favs.findOneByType(type);
    if (entity.includes(id)) {
      this.db.favs.delete(type, id);
    }
  } */
}
