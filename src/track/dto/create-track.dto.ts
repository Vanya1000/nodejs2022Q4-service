import { IsString, IsNumber, ValidateIf, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsString({ message: 'Must be a string' })
  name: string;
  @IsUUID('all', { message: 'Must be a UUID' })
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;
  @IsUUID('all', { message: 'Must be a UUID' })
  @ValidateIf((object, value) => value !== null)
  albumId: string | null;
  @IsNumber({}, { message: 'Must be a number' })
  duration: number;
}
