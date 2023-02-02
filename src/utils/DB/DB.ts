import { Injectable } from '@nestjs/common/decorators';
import * as crypto from 'node:crypto';

abstract class DBEntity<Entity extends { id: string }, ChangeDTO, CreateDTO> {
  protected entities: Entity[] = [];

  abstract create(createDto: CreateDTO): Entity;

  findMany<K extends keyof Entity>(key?: K, value?: Entity[K]) {
    if (key && value) {
      return this.entities.filter((entity) => entity[key] === value);
    }
    return this.entities;
  }

  findOne<K extends keyof Entity>(key: K, value: Entity[K]) {
    return this.entities.find((entity) => entity[key] === value);
  }

  update(id: string, changeDto: ChangeDTO) {
    const index = this.entities.findIndex((entity) => entity.id === id);
    const entity = this.entities[index];
    const updated: Entity = {
      ...entity,
      ...changeDto,
    };
    this.entities[index] = updated;
    return updated;
  }

  delete(id: string) {
    const index = this.entities.findIndex((entity) => entity.id === id);
    const del = this.entities.splice(index, 1);
    return del[0];
  }
}

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

class DBUsers extends DBEntity<UserEntity, ChangeUserDTO, CreateUserDTO> {
  create(dto: CreateUserDTO) {
    const created: UserEntity = {
      ...dto,
      id: crypto.randomUUID(),
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
@Injectable()
export default class DB {
  users = new DBUsers();
}
