import { User } from './../users/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(loginUserDto);
    return this.generateToken(user);
  }

  async refresh(createAuthDto: LoginUserDto) {
    return 'This action adds a new auth';
  }

  private async validateUser(loginUserDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(loginUserDto.login);
    const isPasswordEquals = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (user && isPasswordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Invalid email or password' });
  }

  private generateToken(user: User) {
    const payload = { userId: user.id, login: user.login };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
