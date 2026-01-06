import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { response } from 'express';
import { catchError, finalize, Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    console.log(`Request started at ${new Date(start).toISOString()}`);

    const request = context.switchToHttp().getRequest<Request>();
    //const response = context.switchToHttp().getResponse<Response>();

    const { method, url } = request;

    // Get or generate correlation ID
    // const headerValue = request.headers['x-correlation-id'];
    //const headerValue = request.headers.get<string>('x-correlation-id');
    // const correlationId = headerValue === null ? headerValue : randomUUID();
    const correlationId = randomUUID();

    // Set correlation ID in response header
    //response.setHeader('X-Correlation-Id', correlationId);

    console.log(
      `[${correlationId}] Request started: ${method} ${url} at ${new Date(start).toISOString()}`,
    );

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        console.log(
          `[${correlationId}] Request completed: ${method} ${url} - Status: ${response.statusCode} - Duration: ${duration}ms`,
        );
      }),
      catchError((error: Error) => {
        const duration = Date.now() - start;
        console.error(
          `[${correlationId}] Request failed: ${method} ${url} - Duration: ${duration}ms`,
        );
        console.error(`[${correlationId}] Error:`, {
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined,
          // status:
          //   typeof error === 'object' && error !== null && 'status' in error
          //     ? error.status
          //     : undefined,
        });
        throw error;
      }),
      finalize(() => {
        const end = Date.now();
        const duration = end - start;
        console.log(
          `[${correlationId}] Request finalized at ${new Date(end).toISOString()}, total execution time: ${duration}ms`,
        );
      }),
    );

    // return next.handle().pipe(
    //   finalize(() => {
    //     const end = Date.now();
    //     const duration = end - start;
    //     console.log(
    //       `Request ended at ${new Date(end).toISOString()}, execution time: ${duration}ms`,
    //     );
    //   }),
    // );
  }
}
