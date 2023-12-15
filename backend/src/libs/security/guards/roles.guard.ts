// import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
// import { Reflector } from "@nestjs/core";
// import { JwtService } from "@nestjs/jwt";
// import { Role } from "src/user/common/constants/role.enum";

// @Injectable()
// export class RolesGuard implements CanActivate {
//     constructor(
//         private reflector: Reflector,
//         private jwtService: JwtService
//         ) { }

//     canActivate(context: ExecutionContext): boolean {

//         const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
//             context.getHandler(),
//             context.getClass(),
//         ]);

//         const request = context.switchToHttp().getRequest();

//         const headers = request.headers.authorization;

//         const bearer = headers.split(' ')[0];
//         const token = headers.split(' ')[1];
//         const user = this.jwtService.verify(token);

//         console.log(user);
    
//         return true;

//         //return requiredRoles.some((role) => user.roles.includes(role));
//     }
// }

import { CanActivate, ExecutionContext, HttpException, HttpStatus, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "src/app/product/decorators/roles.decorator";

export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService,
        private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            console.log('start');
            const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ]);
            console.log('this is requiered roles: ', requiredRoles);
            if (!requiredRoles) {
                return true;
            }
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            console.log(authHeader);
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'User is not authorized' });
            }

            const user = this.jwtService.verify(token);
            req.user = user;
            console.log(user);
            return user.roles.some(role => requiredRoles.includes(role.value));
        }
        catch (e) {
            throw new HttpException('No access', HttpStatus.FORBIDDEN);
        } 
    }
}