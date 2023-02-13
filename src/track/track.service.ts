import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
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

  async tryFindOne(id: string) {
    return await this.trackRepository.findOneBy({ id });
  }
}
