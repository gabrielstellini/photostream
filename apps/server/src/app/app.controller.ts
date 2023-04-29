import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

/**
 * Out of scope for now
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}
