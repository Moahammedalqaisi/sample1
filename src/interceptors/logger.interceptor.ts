import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    console.log(`Request started at ${new Date(start).toISOString()}`);

    return next.handle().pipe(
      finalize(() => {
        const end = Date.now();
        const duration = end - start;
        console.log(
          `Request ended at ${new Date(end).toISOString()}, execution time: ${duration}ms`,
        );
      }),
    );
  }
}
