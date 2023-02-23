import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(dto: CreateUserDto) {
    const user = await this.getUserByEmail(dto.login);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const hashPassword = await bcrypt.hash(
      dto.password,
      +process.env.CRYPT_SALT,
    );
    const userWithHashPassword = { ...dto, password: hashPassword };
    return await this.usersRepository.save(userWithHashPassword);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.findOne(id);
    const isEqualPass = await bcrypt.compare(dto.oldPassword, user.password);
    if (!isEqualPass) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    }
    user.password = dto.newPassword;
    return await this.usersRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return await this.usersRepository.remove(user);
  }

  async getUserByEmail(login: string) {
    return await this.usersRepository.findOne({ where: { login } });
  }
}
