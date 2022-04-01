import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('task1')
  getTask1() {
    return this.appService.getTask1();
  }

  @Get('task2')
  getTask2() {
    return this.appService.getTask2();
  }
}
