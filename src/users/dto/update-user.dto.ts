import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'Must be a string' })
  oldPassword: string;
  @IsString({ message: 'Must be a string' })
  newPassword: string;
}
