import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const UserDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let user: UserDecoratorInterface = request.user;
    return user;
  },
);

export interface UserDecoratorInterface {
  id: number;
  username: string;
  role: string;
}
