import { UpdateTokenDTO } from './dto/update-token.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { Injectable, ForbiddenException, HttpException } from '@nestjs/common';
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
    return this.generateToken(user.id, user.login);
  }

  async refresh(updateTokenDTO: UpdateTokenDTO) {
    try {
      const { userId, login } = await this.jwtService.verify(
        updateTokenDTO.refreshToken,
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
        },
      );
      return this.generateToken(userId, login);
    } catch (err) {
      throw new ForbiddenException({ message: 'Invalid refresh token' });
    }
  }

  private async validateUser(loginUserDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(loginUserDto.login);
    if (user) {
      const isPasswordEquals = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );

      if (user && isPasswordEquals) {
        return user;
      }
    }

    throw new ForbiddenException({ message: 'Invalid login or password' });
  }

  private generateToken(userId: string, login: string) {
    const payload = { userId, login };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    };
  }
}
