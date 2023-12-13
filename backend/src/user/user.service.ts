import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './common/dto/createUserDto';
import { Role } from './common/constants/role.enum';

interface CustomRequest extends Request {
    user: {
        id: string;
        email: string;
    };
}

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async getMyUser(id: string, req: CustomRequest) {
        const user = await this.prisma.user.findUnique({ where: { id } });

        if (!user) {
            throw new NotFoundException();
        }

        const decodedUser = req.user as { id: string, email: string };

        if (user.id !== decodedUser.id) {
            throw new ForbiddenException();
        }

        delete user.hashedPassword;

        return { user };
    }

    async getUsers() {
        return await this.prisma.user.findMany({
            select: { id: true, email: true }
        });
    }

    async findOneWithUserName(userName: string) {
        return await this.prisma.user.findUnique({ where: { email: userName } })
    }

    async create(createUserDto: CreateUserDto) {
        const { email, password, name } = createUserDto;

        const roles = [Role.USER];

        const hashedPassword = await this.hashPassword(password);

        const user = await this.prisma.user.create({
            data: {
                name,
                email,
                hashedPassword,
                roles
            }
        });

        return user;
    }

    async hashPassword(password: string) {
        const saltOrRounds = 6;
        return await bcrypt.hash(password, saltOrRounds);
    }

}