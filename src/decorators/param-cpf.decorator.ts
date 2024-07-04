import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ParamCPF = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return String(context.switchToHttp().getRequest().params.CPF);
  },
);
