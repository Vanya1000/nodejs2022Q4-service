import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
