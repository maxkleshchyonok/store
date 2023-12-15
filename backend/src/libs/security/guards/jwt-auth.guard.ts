import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/app/product/decorators/roles.decorator';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') implements CanActivate {
    constructor(private jwtService: JwtService,
        private reflector: Reflector) {
        super()
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ]);
            if (!requiredRoles) {
                return true;
            }
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'User is not authorized' });
            }

            const user = this.jwtService.verify(token);
            req.user = user;
            return user.sub.roles.some(role => requiredRoles.includes(role));
        }
        catch (e) {
            throw new HttpException('No access', HttpStatus.FORBIDDEN);
        }
    }

}