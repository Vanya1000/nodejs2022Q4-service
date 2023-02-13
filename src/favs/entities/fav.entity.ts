import { Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Artist } from './../../artist/entities/artist.entity';
import { Album } from './../../album/entities/album.entity';
import { Track } from './../../track/entities/track.entity';

@Entity()
export class Favorites {
  @PrimaryColumn({ default: 1 })
  id: number;

  @OneToMany(() => Artist, (artist) => artist.favorites, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artists: Artist[];

  @OneToMany(() => Album, (album) => album.favorites, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  albums: Album[];

  @OneToMany(() => Track, (track) => track.favorites, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  tracks: Track[];
}
