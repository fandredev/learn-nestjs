import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';

// Interceptor para adicionar um header na resposta na rota
export class AddHeaderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const response = context.switchToHttp().getResponse(); // pega a resposta

    response.header('X-Custom-Header', 'Custom Header'); // adiciona o header

    return next.handle(); // continua a execução
  }
}
