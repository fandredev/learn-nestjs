import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  Injectable,
} from '@nestjs/common';
import { catchError, throwError } from 'rxjs';

// Impact on performance]
@Injectable()
export class ErrorHandlingInterceptor implements NestInterceptor {
  private logger = new Logger();

  async intercept(_: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      catchError((error) => {
        this.logger.error(`Error: ${error.name} - ${error.message}`);
        throw throwError(() => error);
      }),
    );
  }
}
