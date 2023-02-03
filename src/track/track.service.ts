import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import DB from 'src/utils/DB/DB';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private db: DB) {}
  create(dto: CreateTrackDto) {
    return this.db.track.create(dto);
  }

  findAll() {
    return this.db.track.findMany();
  }

  findOne(id: string) {
    const track = this.tryGetOne(id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  update(id: string, dto: UpdateTrackDto) {
    const track = this.tryGetOne(id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return this.db.track.update(id, dto);
  }

  remove(id: string) {
    const track = this.tryGetOne(id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return this.db.track.delete(id);
  }

  tryGetOne(id: string) {
    return this.db.track.findOne('id', id);
  }

  tryGetMany(ids: string[]) {
    return this.db.track.findManyInArrayAnyOf('id', ids);
  }
}
