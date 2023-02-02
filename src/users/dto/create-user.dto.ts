import { IsString, IsDefined } from 'class-validator';

export class CreateUserDto {
  @IsDefined({ message: 'Must be defined' })
  @IsString({ message: 'Must be a string' })
  login: string;
  @IsString({ message: 'Must be a string' })
  @IsDefined({ message: 'Must be defined' })
  password: string;
}
