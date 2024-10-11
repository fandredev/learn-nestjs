import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  Injectable,
} from '@nestjs/common';
import { tap } from 'rxjs';

// Impact on performance
@Injectable()
export class TimingConnectionInterceptor implements NestInterceptor {
  private logger = new Logger();

  async intercept(_: ExecutionContext, next: CallHandler) {
    const startTime = Date.now();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return next.handle().pipe(
      tap(() => {
        const finalTime = Date.now();
        const elapsedTime = finalTime - startTime;
        this.logger.log(`Time elapsed: ${elapsedTime}ms`);
      }),
    );
  }
}
