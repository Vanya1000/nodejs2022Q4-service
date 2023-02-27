import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm';
import { Artist } from './../../artist/entities/artist.entity';
import { Album } from './../../album/entities/album.entity';
import { Favorites } from './../../favs/entities/fav.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;

  @Column({ type: 'uuid', nullable: true })
  albumId: string | null;

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    onDelete: 'SET NULL',
  })
  artist: Artist;

  @ManyToOne(() => Album, (album) => album.tracks, {
    onDelete: 'SET NULL',
  })
  album: Album;

  @ManyToOne(() => Favorites, (favorites) => favorites.tracks)
  favorites: Favorites;
}
