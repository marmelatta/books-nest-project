import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        console.log(`After... ${Date.now() - now}ms`);
      }),
      map((data) => ({
        status: 'success',
        data,
      })),
      catchError((err) => {
        return throwError(
          new HttpException(
            { status: 'fail', data: err },
            HttpStatus.BAD_REQUEST,
          ),
        );
      }),
    );
  }
}
