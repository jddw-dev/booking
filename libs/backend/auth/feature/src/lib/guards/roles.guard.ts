import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  private logger: Logger = new Logger(RolesGuard.name);

  constructor(private _reflector: Reflector) {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let roles = this._reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      // Try to get roles Controller scope
      roles = this._reflector.get<string[]>('roles', context.getClass());

      if (!roles) {
        return true;
      }
    }

    const request = GqlExecutionContext.create(context).getContext().req;
    const user = request.user;

    return this.handle_(roles, user);
  }

  private handle_(roles: string[], user: any): boolean {
    const realRoles = [user.role];

    let included = false;

    realRoles.forEach((role) => {
      if (roles.includes(role)) {
        included = true;
      }
    });

    return included;
  }
}
