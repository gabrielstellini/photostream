import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

/**
 * Out of scope
 * but if nest was part of the task, I'd create a photos and favourites controller + services for the backend
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}
