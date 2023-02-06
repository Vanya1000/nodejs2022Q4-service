import { Exclude } from 'class-transformer';

export class UserEntity {
  id: string;
  name: string;
  email: string;
  @Exclude()
  password: string;
  createdAt: number;
  updatedAt: number;
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
