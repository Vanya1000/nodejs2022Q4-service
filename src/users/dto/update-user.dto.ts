import { IsString, IsDefined } from 'class-validator';

export class UpdateUserDto {
  @IsDefined({ message: 'Must be defined' })
  @IsString({ message: 'Must be a string' })
  oldPassword: string;
  @IsDefined({ message: 'Must be defined' })
  @IsString({ message: 'Must be a string' })
  newPassword: string;
}
