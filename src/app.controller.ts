import { AllowUnauthorizedRequest } from './auth/decorators/allow-unautorized.decorators';
import { AppService } from './app.service';
import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @AllowUnauthorizedRequest()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
