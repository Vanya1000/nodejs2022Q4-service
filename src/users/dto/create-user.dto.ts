import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Must be a string' })
  login: string;
  password: string;
}
