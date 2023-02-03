import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import DB from 'src/utils/DB/DB';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private db: DB) {}
  create(dto: CreateAlbumDto) {
    return this.db.album.create(dto);
  }

  findAll() {
    return this.db.album.findMany();
  }

  findOne(id: string) {
    const album = this.db.album.findOne('id', id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  update(id: string, dto: UpdateAlbumDto) {
    const album = this.db.album.findOne('id', id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return this.db.album.update(id, dto);
  }

  remove(id: string) {
    const album = this.db.album.findOne('id', id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return this.db.album.delete(id);
  }
}
