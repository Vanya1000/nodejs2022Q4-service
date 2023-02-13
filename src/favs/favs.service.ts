import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { TrackService } from './../track/track.service';
import { FavsPathType } from './types/type';
import { ArtistService } from './../artist/artist.service';
import { AlbumService } from './../album/album.service';
import { Favorites } from './entities/fav.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(Favorites)
    private favoritesRepository: Repository<Favorites>,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  async findAll() {
    const { albums, artists, tracks } = await this.favoritesRepository.findOne({
      where: { id: 1 },
      relations: ['albums', 'artists', 'tracks'],
    });
    return { albums, artists, tracks };
  }

  async create(type: FavsPathType, id: string) {
    const entity = await this.getEntityByType(type, id);

    const favItem = await this.getFavoritiesByType<typeof type>(type);

    const isAlreadyInFavs = favItem[type].some((item) => item.id === id);

    if (isAlreadyInFavs) {
      throw new HttpException('Already in favorites', HttpStatus.CONFLICT);
    }

    await this.favoritesRepository.save({
      id: 1,
      [type]: [...favItem[type], entity],
    });

    return {
      message: `Id: ${id} successfully added to ${type}`,
    };
  }

  async remove(type: FavsPathType, id: string) {
    await this.getEntityByType(type, id);

    const favItem = await this.getFavoritiesByType<typeof type>(type);

    const isAlreadyInFavs = favItem[type].some((item) => item.id === id);

    if (!isAlreadyInFavs) {
      throw new HttpException('Not in favorites', HttpStatus.CONFLICT);
    }

    const spliceIndex = favItem[type].findIndex((item) => item.id === id);
    favItem[type].splice(spliceIndex, 1);

    await this.favoritesRepository.save({
      id: 1,
      [type]: favItem[type],
    });
  }

  private getServiceByType(type: FavsPathType) {
    switch (type) {
      case 'artists':
        return this.artistService;
      case 'albums':
        return this.albumService;
      case 'tracks':
        return this.trackService;
    }
  }

  private async getEntityByType(type: FavsPathType, id: string) {
    const entity = await this.getServiceByType(type).tryFindOne(id);

    if (!entity) {
      throw new HttpException(
        `${type} with id=${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return entity;
  }

  private async getFavoritiesByType<T extends keyof Favorites>(
    type: FavsPathType,
  ): Promise<Pick<Favorites, T>> {
    return await this.favoritesRepository.findOne({
      where: { id: 1 },
      select: [type],
      relations: [type],
    });
  }
}
