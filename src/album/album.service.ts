import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import DB from 'src/utils/DB/DB';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { FavsService } from './../favs/favs.service';
import { TrackService } from './../track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => FavsService))
    @Inject(forwardRef(() => TrackService))
    private favsService: FavsService,
    private tracksService: TrackService,
    private db: DB,
  ) {}
  create(dto: CreateAlbumDto) {
    return this.db.album.create(dto);
  }

  findAll() {
    return this.db.album.findMany();
  }

  findOne(id: string) {
    const album = this.tryGetOne(id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  update(id: string, dto: UpdateAlbumDto) {
    const album = this.tryGetOne(id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return this.db.album.update(id, dto);
  }

  remove(id: string) {
    const album = this.tryGetOne(id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    this.favsService.removeFromAnother('albums', id);
    this.tracksService.tryFindManyAndNullAlbumId(id);
    return this.db.album.delete(id);
  }

  tryGetOne(id: string) {
    return this.db.album.findOne('id', id);
  }

  tryGetMany(ids: string[]) {
    return this.db.album.findManyInArrayAnyOf('id', ids);
  }

  tryFindManyAndNullArtistId(id: string) {
    const albums = this.db.album.findMany('artistId', id);
    if (albums) {
      albums.forEach((album) => {
        album.artistId = null;
        this.db.album.update(album.id, album);
      });
    }
    return albums;
  }
}
