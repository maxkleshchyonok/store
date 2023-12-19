import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../../domain/dtos/createUserDto';
import { Role } from '../../enums/role.enum';
import { UserRepo } from 'src/domain/repos/user.repo';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private userRepo: UserRepo
         ) { }

    async getMyUser(id: string) {
        return await this.userRepo.getMyUser(id);
    }

    async getUsers() {
        return await this.userRepo.getUsers();
    }

    async findOneWithUserName(userName: string) {
        return await this.userRepo.findOneWithUserName(userName);
    }

    async create(data:  Pick<User, 'name' | 'email'>, password: string) {

        const roles = [Role.USER];

        const hashedPassword = await this.hashPassword(password);

        const userData: Pick<User, 'name' | 'email' | 'hashedPassword' | 'roles'> = {
            name: data.name,
            email: data.email,
            hashedPassword: hashedPassword,
            roles: roles,
        };

        return await this.userRepo.create(userData);
    }

    async hashPassword(password: string) {
        const saltOrRounds = 6;
        return await bcrypt.hash(password, saltOrRounds);
    }

}