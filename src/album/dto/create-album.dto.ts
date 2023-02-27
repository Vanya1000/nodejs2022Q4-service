import { IsString, IsNumber, ValidateIf, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsString({ message: 'Must be a string' })
  name: string;
  @IsNumber({}, { message: 'Must be a number' })
  year: number;
  @IsUUID('all', { message: 'Must be a UUID' })
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;
}
