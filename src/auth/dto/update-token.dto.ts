import { IsString } from 'class-validator';

export class UpdateTokenDTO {
  @IsString({ message: 'Must be a string' })
  refreshToken: string;
}
