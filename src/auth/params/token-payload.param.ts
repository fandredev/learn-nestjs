import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST_TOKEN_PAYLOAD_KEY } from '../auth.constants';

export const TokenPayloadParam = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const context = ctx.switchToHttp();
    const request = context.getRequest<Request>();

    return request[REQUEST_TOKEN_PAYLOAD_KEY];
  },
);
