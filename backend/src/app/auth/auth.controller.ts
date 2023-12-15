import { AuthService } from './auth.service';
import { Controller, Post, Request, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from '../../libs/security/guards/local-auth.guard';
import { CreateUserDto } from 'src/domain/dtos/createUserDto';
import { UserService } from 'src/app/user/user.service';
import { RefreshJwtGuard } from '../../libs/security/guards/refresh-jwt-auth.guard';
import { Public } from 'src/app/product/decorators/public.decorator';
import { User } from '@prisma/client';
import { SignupForm } from './domain/signup.form';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    @Post('register')
    async registerUser(@Body() data: SignupForm) {
        return await this.authService.create(data);
    }

    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    async refreshToken(@Request() req) {
        return this.authService.refreshToken(req.user);
    }

}
