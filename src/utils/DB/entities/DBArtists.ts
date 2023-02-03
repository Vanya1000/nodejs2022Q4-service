import * as crypto from 'node:crypto';
import DBEntity from './DBEntity';

type ArtistEntity = {
  id: string;
  name: string;
  grammy: boolean;
};

type CreateArtistDTO = Omit<ArtistEntity, 'id'>;
type ChangeArtistDTO = Omit<ArtistEntity, 'id'>;

export default class DBArtists extends DBEntity<
  ArtistEntity,
  ChangeArtistDTO,
  CreateArtistDTO
> {
  create(dto: CreateArtistDTO) {
    const created: ArtistEntity = {
      id: crypto.randomUUID(),
      ...dto,
    };
    this.entities.push(created);
    return created;
  }
}
