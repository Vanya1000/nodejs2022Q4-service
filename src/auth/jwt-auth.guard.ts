import { REFRESH_TOKEN } from './decorators/refresh-token.decorators';
import { ALLOW_UNAUTHORIZED_REQUEST } from './decorators/allow-unautorized.decorators';
import { JwtService } from '@nestjs/jwt/dist';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const allowUnauthorizedRequest = this.reflector.get<boolean>(
      ALLOW_UNAUTHORIZED_REQUEST,
      context.getHandler(),
    );

    const refreshToken = this.reflector.get<boolean>(
      REFRESH_TOKEN,
      context.getHandler(),
    );

    if (allowUnauthorizedRequest) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader?.split(' ')[0];
      const token = authHeader?.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'You dont pass token in autorization header',
        });
      }

      let user: unknown;
      if (refreshToken) {
        user = this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
        });
      } else {
        user = this.jwtService.verify(token);
      }
      req.user = user;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException({ message: 'Invalid token' });
    }
    return true;
  }
}
