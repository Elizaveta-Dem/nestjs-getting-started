import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from 'src/decorators/role-auth.decorator';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRole = this.reflector.getAllAndOverride<string>(ROLE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requiredRole) {
        return true;
      }

      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;

      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }

      const secretKey = this.configService.get('JWT_SECRET');
      const user = this.jwtService.verify(token, { secret: secretKey });

      // сохранение пользователя в объекте запроса для дальнейшего использования
      req.user = user;
      //   проверка на соответствие роли пользователя требуемой роли
      if (user.role.value) {
        return user.role.value === requiredRole;
      } else {
        return false;
      }
    } catch (e) {
      throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
    }
  }
}
