import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import DB from 'src/utils/DB/DB';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { FavsService } from './../favs/favs.service';
import { TrackService } from './../track/track.service';
import { AlbumService } from './../album/album.service';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @Inject(forwardRef(() => FavsService))
    @Inject(forwardRef(() => AlbumService))
    @Inject(forwardRef(() => TrackService))
    private favsService: FavsService,
    private albumsService: AlbumService,
    private tracksService: TrackService,
    private db: DB,
  ) {}
  async create(dto: CreateArtistDto) {
    return await this.artistRepository.save(dto);
  }

  async findAll() {
    return await this.artistRepository.find({
      relations: {
        albums: true,
        tracks: true,
      },
    });
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOne(id);
    return await this.artistRepository.save({ ...artist, ...updateArtistDto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.artistRepository.delete(id);
  }

  tryGetOne(id: string) {
    return this.db.artists.findOne('id', id);
  }

  tryGetMany(ids: string[]) {
    return this.db.artists.findManyInArrayAnyOf('id', ids);
  }
}
