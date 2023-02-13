import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}
  async create(dto: CreateAlbumDto) {
    return await this.albumRepository.save(dto);
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  async update(id: string, dto: UpdateAlbumDto) {
    const album = await this.findOne(id);
    return this.albumRepository.save({ ...album, ...dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.albumRepository.delete(id);
  }

  async tryFindOne(id: string) {
    return await this.albumRepository.findOneBy({ id });
  }
}
