import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Role } from 'src/enums/role.enum';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { CreateUserDto } from '../dtos/createUserDto';
import * as bcrypt from 'bcrypt';
import { Order, User } from '@prisma/client';

interface CustomRequest extends Request {
    user: {
        id: string;
        email: string;
    };
}

@Injectable()
export class UserRepo {
    constructor(private prisma: PrismaService) { }

    // async getMyUser(id: string, req: CustomRequest) {
    //     const user = await this.prisma.user.findUnique({
    //         where: { id },
    //         include: {
    //             orders: {
    //                 include: {
    //                     items: true
    //                 }
    //             }
    //         }
    //     },
    //     );

    //     if (!user) {
    //         throw new NotFoundException();
    //     }

    //     const decodedUser = req.user as { id: string, email: string };

    //     if (user.id !== decodedUser.id) {
    //         throw new ForbiddenException();
    //     }

    //     delete user.hashedPassword;

    //     return { user };
    // }

    async getMyUser(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                roles: true,
                orders: true
            }
        },
        );

        if (!user) {
            throw new NotFoundException();
        }

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

    async create(userData: Pick<User, 'name' | 'email' | 'hashedPassword' | 'roles'>) {


        const user = await this.prisma.user.create({
            data: userData,
        });

        return user;
    }

    async hashPassword(password: string) {
        const saltOrRounds = 6;
        return await bcrypt.hash(password, saltOrRounds);
    }


}