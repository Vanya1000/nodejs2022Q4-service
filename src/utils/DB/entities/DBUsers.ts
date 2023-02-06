import * as crypto from 'node:crypto';
import DBEntity from './DBEntity';

type UserEntity = {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
};

type CreateUserDTO = Pick<UserEntity, 'login' | 'password'>;
type ChangeUserDTO = Pick<UserEntity, 'password'>;

export default class DBUsers extends DBEntity<
  UserEntity,
  ChangeUserDTO,
  CreateUserDTO
> {
  create(dto: CreateUserDTO) {
    const created: UserEntity = {
      id: crypto.randomUUID(),
      ...dto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.entities.push(created);
    return created;
  }

  update(id: string, dto: ChangeUserDTO) {
    const updated = super.update(id, dto);
    updated.version += 1;
    updated.updatedAt = Date.now();
    return updated;
  }
}
