import { RefreshJwtStrategy } from '../../libs/security/strategies/refreshToken.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/app/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from '../../libs/security/strategies/local-strategy';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { JwtStrategy } from '../../libs/security/strategies/jwt-strategy';
import { UserRepo } from 'src/domain/repos/user.repo';

@Module({
  providers: [
    AuthService,
    PrismaService,
    LocalStrategy,
    UserService,
    JwtStrategy,
    RefreshJwtStrategy,
    UserRepo
  ],
  controllers: [AuthController],
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: `${process.env.jwt_secret}`,
      signOptions: { expiresIn: '1d' }
    })],
})
export class AuthModule { }
