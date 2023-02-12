import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import DB from 'src/utils/DB/DB';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FavsService } from './../favs/favs.service';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    @Inject(forwardRef(() => FavsService))
    private favsService: FavsService,
    private db: DB,
  ) {}
  async create(dto: CreateTrackDto) {
    return await this.trackRepository.save(dto);
  }

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  async update(id: string, dto: UpdateTrackDto) {
    const track = await this.findOne(id);
    return this.trackRepository.save({ ...track, ...dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.trackRepository.delete(id);
  }

  tryGetOne(id: string) {
    return this.db.track.findOne('id', id);
  }

  tryGetMany(ids: string[]) {
    return this.db.track.findManyInArrayAnyOf('id', ids);
  }

  tryFindManyAndNullArtistId(id: string) {
    const tracks = this.db.track.findMany('artistId', id);
    if (tracks) {
      tracks.forEach((track) => {
        track.artistId = null;
        this.db.track.update(track.id, track);
      });
    }
  }

  tryFindManyAndNullAlbumId(id: string) {
    const tracks = this.db.track.findMany('albumId', id);
    if (tracks) {
      tracks.forEach((track) => {
        track.albumId = null;
        this.db.track.update(track.id, track);
      });
    }
  }
}
