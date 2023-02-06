import * as crypto from 'node:crypto';
import DBEntity from './DBEntity';

type TrackEntity = {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
};

type CreateTrackDTO = Omit<TrackEntity, 'id'>;
type ChangeTrackDTO = Omit<TrackEntity, 'id'>;

export default class DBTracks extends DBEntity<
  TrackEntity,
  ChangeTrackDTO,
  CreateTrackDTO
> {
  create(dto: CreateTrackDTO) {
    const created: TrackEntity = {
      id: crypto.randomUUID(),
      ...dto,
    };
    this.entities.push(created);
    return created;
  }
}
