import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  getTask1() {
    return this.httpService
      .get('https://api.github.com/zen')
      .pipe(map((response) => response.data));
  }

  getTask2() {
    return this.httpService
      .get('https://gitlab.com/api/v4/version')
      .pipe(map((response) => response.data));
  }
}
