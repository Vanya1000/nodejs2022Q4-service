import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { StatusCodes } from 'http-status-codes';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { UserEntity } from './entities/user.entity';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(this.usersService.create(createUserDto));
  }

  @Get()
  findAll() {
    const users = this.usersService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return new UserEntity(this.usersService.findOne(id));
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return new UserEntity(this.usersService.update(id, updateUserDto));
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return new UserEntity(this.usersService.remove(id));
  }
}
