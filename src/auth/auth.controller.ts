import { RefreshTokenCanBe } from './decorators/refresh-token.decorators';
import { AllowUnauthorizedRequest } from './decorators/allow-unautorized.decorators';
import { UpdateTokenDTO } from './dto/update-token.dto';
import { User } from './../users/entities/user.entity';
import { UseInterceptors, HttpCode } from '@nestjs/common/decorators';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { StatusCodes } from 'http-status-codes';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AllowUnauthorizedRequest()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return new User(await this.authService.signup(createUserDto));
  }

  @AllowUnauthorizedRequest()
  @HttpCode(StatusCodes.OK)
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @RefreshTokenCanBe()
  @HttpCode(StatusCodes.OK)
  @Post('refresh')
  refresh(@Body() updateTokenDTO: UpdateTokenDTO) {
    return this.authService.refresh(updateTokenDTO);
  }
}
