import { Exclude, Transform } from 'class-transformer';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @VersionColumn()
  version: number;

  @Transform(({ value }) => new Date(value).getTime())
  @CreateDateColumn()
  createdAt: string;

  @Transform(({ value }) => new Date(value).getTime())
  @UpdateDateColumn()
  updatedAt: string;
}
