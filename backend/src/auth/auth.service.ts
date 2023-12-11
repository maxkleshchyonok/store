import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService,
        private jwtService: JwtService) { }

    async login(user: User) {
        const payload = {
            username: user.email,
            sub: {
                name: user.name
            },
        };

        return {
            ...user,
            accessToken: this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' })
        }
    }

    async validateUser(username: string, password: string) {
        const user = await this.userService.findOneWithUserName(username);

        if (user && (await bcrypt.compare(password, user.hashedPassword))) {
            const { ...result } = user;
            return result;
        }

        return null;
    }

    async refreshToken(user: User) {
        const payload = {
            username: user.email,
            sub: {
                name: user.name,
            },
        };

        return {
            accessToken: this.jwtService.sign(payload),
        }
    }

}
