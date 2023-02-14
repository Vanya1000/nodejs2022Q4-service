import { Exclude } from 'class-transformer';

import { Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Artist } from './../../artist/entities/artist.entity';
import { Album } from './../../album/entities/album.entity';
import { Track } from './../../track/entities/track.entity';

@Entity()
export class Favorites {
  constructor(partial: Partial<Favorites>) {
    Object.assign(this, partial);
  }
  @PrimaryColumn({ default: 1 })
  @Exclude()
  id: number;

  @OneToMany(() => Artist, (artist) => artist.favorites)
  artists: Artist[];

  @OneToMany(() => Album, (album) => album.favorites)
  albums: Album[];

  @OneToMany(() => Track, (track) => track.favorites)
  tracks: Track[];
}
