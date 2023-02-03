import * as crypto from 'node:crypto';
import DBEntity from './DBEntity';

type AlbumEntity = {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
};

type CreateAlbumDTO = Omit<AlbumEntity, 'id'>;
type ChangeAlbumDTO = Omit<AlbumEntity, 'id'>;

export default class DBAlbums extends DBEntity<
  AlbumEntity,
  ChangeAlbumDTO,
  CreateAlbumDTO
> {
  create(dto: CreateAlbumDTO) {
    const created: AlbumEntity = {
      id: crypto.randomUUID(),
      ...dto,
    };
    this.entities.push(created);
    return created;
  }
}
