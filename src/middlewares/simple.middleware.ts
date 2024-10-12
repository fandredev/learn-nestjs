// Cliente (Navegador) ->
// (Servidor) - Midddleware (Request, Response) ->
// NestJS (Guards, Interceptors, Pipes, Filters, Controllers, Services, Modules) -> (Servidor) -> Cliente (Navegador)

import { Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class SimpleMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log('Middleware called for any reason');

    res.header('X-Custom-Header-Middleware', 'Custom Header Middleware'); // adiciona o header

    res.on('finish', () =>
      this.logger.log('Middleware called after response sent'),
    );

    next();
  }
}
