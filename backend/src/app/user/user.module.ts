import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepo } from 'src/domain/repos/user.repo';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepo, PrismaService]
})
export class UserModule {}
