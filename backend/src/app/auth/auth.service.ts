import { UserService } from '../user/user.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepo } from 'src/domain/repos/user.repo';
import { Role } from 'src/enums/role.enum';
import { SignupForm } from './domain/signup.form';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
        private userRepo: UserRepo,
    ) { }

    async login(user: User) {
        const payload = {
            username: user.email,
            sub: {
                name: user.name,
                roles: user.roles

            },
        };

        return {
            ...user,
            accessToken: this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' })
        }
    }

    async create(data: SignupForm) {

        const { name, email, password } = data;

        const roles = [Role.USER];

        const hashedPassword = await this.hashPassword(password);

        const userData: Pick<User, 'name' | 'email' | 'hashedPassword' | 'roles'> = {
            name: name,
            email: email,
            hashedPassword: hashedPassword,
            roles: roles,
        };

        return await this.userRepo.create(userData);
    }


    async hashPassword(password: string) {
        const saltOrRounds = 6;
        return await bcrypt.hash(password, saltOrRounds);
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
