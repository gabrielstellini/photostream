import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // Out of scope, but this is where you would add a database call.
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
