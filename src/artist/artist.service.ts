import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import DB from 'src/utils/DB/DB';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { FavsService } from './../favs/favs.service';
import { TrackModule } from './../track/track.module';
import { AlbumModule } from './../album/album.module';
import { TrackService } from './../track/track.service';
import { AlbumService } from './../album/album.service';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(forwardRef(() => FavsService))
    @Inject(forwardRef(() => AlbumService))
    @Inject(forwardRef(() => TrackService))
    private favsService: FavsService,
    private albumsService: AlbumService,
    private tracksService: TrackService,
    private db: DB,
  ) {}
  create(dto: CreateArtistDto) {
    return this.db.artists.create(dto);
  }

  findAll() {
    return this.db.artists.findMany();
  }

  findOne(id: string) {
    const artist = this.tryGetOne(id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.tryGetOne(id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return this.db.artists.update(id, updateArtistDto);
  }

  remove(id: string) {
    const artist = this.tryGetOne(id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    this.favsService.removeFromAnother('artists', id);
    this.albumsService.tryFindManyAndNullArtistId(id);
    this.tracksService.tryFindManyAndNullArtistId(id);
    return this.db.artists.delete(id);
  }

  tryGetOne(id: string) {
    return this.db.artists.findOne('id', id);
  }

  tryGetMany(ids: string[]) {
    return this.db.artists.findManyInArrayAnyOf('id', ids);
  }
}
