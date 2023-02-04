import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Req,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { FavsService } from './favs.service';
import { FavsPathType } from './types/type';
import { HttpCode } from '@nestjs/common/decorators';
import { StatusCodes } from 'http-status-codes';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post(['track/:id', 'album/:id', 'artist/:id'])
  create(@Req() req: Request, @Param('id', ParseUUIDPipe) id: string) {
    const type = (req.route.path.split('/')[2] + 's') as FavsPathType;
    return this.favsService.create(type, id);
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete(['track/:id', 'album/:id', 'artist/:id'])
  remove(@Req() req: Request, @Param('id', ParseUUIDPipe) id: string) {
    const type = (req.route.path.split('/')[2] + 's') as FavsPathType;
    return this.favsService.remove(type, id);
  }
}
