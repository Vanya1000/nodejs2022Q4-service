import { IsString, IsBoolean } from 'class-validator';

export class CreateArtistDto {
  @IsString({ message: 'Must be a string' })
  name: string;
  @IsBoolean({ message: 'Must be a boolean' })
  grammy: boolean;
}
