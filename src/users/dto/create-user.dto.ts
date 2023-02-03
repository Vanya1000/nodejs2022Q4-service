import { IsString, IsDefined } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Must be a string' })
  login: string;
  @IsDefined({ message: 'Must be defined' })
  password: string;
}
