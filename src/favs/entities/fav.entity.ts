import { Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Artist } from './../../artist/entities/artist.entity';
import { Album } from './../../album/entities/album.entity';
import { Track } from './../../track/entities/track.entity';

@Entity()
export class Favorites {
  @PrimaryColumn({ default: 1 })
  id: number;

  @OneToMany(() => Artist, (artist) => artist.favorites)
  artists: Artist[];

  @OneToMany(() => Album, (album) => album.favorites)
  albums: Album[];

  @OneToMany(() => Track, (track) => track.favorites)
  tracks: Track[];
}
