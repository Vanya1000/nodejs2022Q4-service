import { IsString, IsBoolean } from 'class-validator';

export class UpdateArtistDto {
  @IsString({ message: 'Must be a string' })
  name: string;
  @IsBoolean({ message: 'Must be a boolean' })
  grammy: boolean;
}
